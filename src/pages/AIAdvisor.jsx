import React, { useState, useRef, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { 
  ArrowLeft, Send, Sparkles, Bot, User,
  AlertTriangle, CheckCircle, Loader2, RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

const SUGGESTED_PROMPTS = [
  "What should I look for in a recording contract?",
  "Is a 50/50 split fair for a producer?",
  "What are red flags in management deals?",
  "How do 360 deals work?",
];

export default function AIAdvisor() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm your AI Deal Advisor. I can help you understand contracts, evaluate deals, and protect your interests. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (userMessage) => {
      const conversationContext = messages
        .map((m) => `${m.role === "user" ? "User" : "Advisor"}: ${m.content}`)
        .join("\n");

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Rocc$tar AI, an expert music industry advisor. You help artists understand contracts, deals, and protect their interests.

CONVERSATION HISTORY:
${conversationContext}

User: ${userMessage}

INSTRUCTIONS:
- Give clear, actionable advice in plain English
- Always explain the implications for the artist
- Highlight risks and red flags
- Suggest questions to ask or terms to negotiate
- Be supportive but honest about bad deals
- If discussing specific numbers, explain if they're fair
- Never give definitive legal advice - recommend lawyers for complex issues

Respond naturally and helpfully. Keep responses concise but thorough.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            response: { type: "string" },
            risk_level: { type: "string", enum: ["low", "medium", "high", "none"] },
            key_points: { type: "array", items: { type: "string" } },
            recommendation: { type: "string" },
          },
        },
      });
      return response;
    },
    onSuccess: (data) => {
      let content = data.response;
      
      if (data.key_points?.length > 0) {
        content += "\n\n**Key Points:**\n" + data.key_points.map(p => `• ${p}`).join("\n");
      }
      
      if (data.recommendation) {
        content += `\n\n💡 **Recommendation:** ${data.recommendation}`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content,
          risk_level: data.risk_level,
        },
      ]);
    },
  });

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    chatMutation.mutate(userMessage);
  };

  const handleSuggestedPrompt = (prompt) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link 
            to={createPageUrl("Dashboard")}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">AI Advisor</h1>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-violet-600 text-white"
                    : "bg-white border border-slate-100 shadow-sm"
                )}
              >
                {message.role === "assistant" ? (
                  <div className="prose prose-sm prose-slate max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                        li: ({ children }) => <li className="text-slate-700">{children}</li>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                    {message.risk_level && message.risk_level !== "none" && (
                      <div className={cn(
                        "mt-3 flex items-center gap-2 text-sm px-3 py-2 rounded-lg",
                        message.risk_level === "high" ? "bg-red-50 text-red-700" :
                        message.risk_level === "medium" ? "bg-amber-50 text-amber-700" :
                        "bg-emerald-50 text-emerald-700"
                      )}>
                        {message.risk_level === "high" ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : message.risk_level === "low" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        <span className="font-medium capitalize">{message.risk_level} Risk</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
              )}
            </div>
          ))}
          
          {chatMutation.isPending && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />
                  <span className="text-slate-400 text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <div className="max-w-lg mx-auto">
            <p className="text-xs text-slate-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="text-sm bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-lg border-t border-slate-100 px-4 py-4 sticky bottom-0">
        <div className="max-w-lg mx-auto flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about contracts, deals, royalties..."
            className="flex-1 h-12 rounded-xl bg-slate-50 border-slate-200"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || chatMutation.isPending}
            className="h-12 w-12 rounded-xl bg-violet-600 hover:bg-violet-700 p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}