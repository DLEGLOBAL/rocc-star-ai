import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Sparkles, Loader2, AlertTriangle, TrendingUp, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export default function AIAdvisor() {
  const [conversationId] = useState(() => `conv_${Date.now()}_${Math.random()}`);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hey! I'm your AI music industry advisor. I can help you understand contracts, evaluate deals, simulate revenue, and spot red flags. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (userMessage) => {
      // Add user message
      const newUserMsg = {
        role: "user",
        content: userMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newUserMsg]);

      // Save to database
      await base44.entities.ChatMessage.create({
        conversation_id: conversationId,
        role: "user",
        content: userMessage
      });

      // Get AI response
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI advisor for music industry professionals. You help artists, producers, and creators understand contracts, evaluate deals, and avoid predatory agreements.

User question: ${userMessage}

Conversation context:
${messages.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n')}

Provide helpful, actionable advice. If discussing contracts:
- Highlight concerning clauses
- Explain complex terms in plain English
- Provide risk assessment
- Suggest negotiation points

Be supportive and protective of the artist's interests. Keep responses concise but informative.`,
        response_json_schema: {
          type: "object",
          properties: {
            content: { type: "string" },
            risk_level: { type: "string" },
            key_points: { type: "array", items: { type: "string" } },
            recommendation: { type: "string" }
          }
        }
      });

      // Format response
      let assistantContent = response.content;
      
      if (response.key_points && response.key_points.length > 0) {
        assistantContent += "\n\n**Key Points:**\n";
        response.key_points.forEach(point => {
          assistantContent += `\n- ${point}`;
        });
      }

      if (response.recommendation) {
        assistantContent += `\n\n**Recommendation:** ${response.recommendation}`;
      }

      const newAssistantMsg = {
        role: "assistant",
        content: assistantContent,
        metadata: {
          risk_level: response.risk_level,
          recommendation: response.recommendation
        },
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newAssistantMsg]);

      // Save to database
      await base44.entities.ChatMessage.create({
        conversation_id: conversationId,
        role: "assistant",
        content: assistantContent,
        metadata: {
          risk_level: response.risk_level,
          recommendation: response.recommendation
        }
      });

      return response;
    }
  });

  const handleSend = () => {
    if (!input.trim() || sendMessageMutation.isPending) return;
    
    const message = input.trim();
    setInput("");
    sendMessageMutation.mutate(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">AI Advisor</h1>
              <p className="text-sm text-slate-500">Your music industry assistant</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={cn(
                "max-w-[80%]",
                message.role === "user" && "flex flex-col items-end"
              )}>
                {message.metadata?.risk_level && (
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-2",
                    message.metadata.risk_level === "high" || message.metadata.risk_level === "critical"
                      ? "bg-red-100 text-red-700"
                      : message.metadata.risk_level === "medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                  )}>
                    <AlertTriangle className="w-3 h-3" />
                    {message.metadata.risk_level} risk
                  </div>
                )}
                
                <Card className={cn(
                  message.role === "user"
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white border-slate-200"
                )}>
                  <CardContent className="p-4">
                    {message.role === "user" ? (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        className="text-sm prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                        components={{
                          strong: ({ children }) => (
                            <strong className="font-semibold text-slate-900">{children}</strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>
                          ),
                          li: ({ children }) => (
                            <li className="text-slate-700">{children}</li>
                          ),
                          p: ({ children }) => (
                            <p className="text-slate-700 leading-relaxed my-2">{children}</p>
                          )
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
          
          {sendMessageMutation.isPending && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about contracts, deals, revenue splits..."
              className="min-h-[60px] resize-none"
              disabled={sendMessageMutation.isPending}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || sendMessageMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700"
              size="lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}