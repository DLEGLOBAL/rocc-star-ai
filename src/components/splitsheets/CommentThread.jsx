import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Send, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function CommentThread({ splitSheetId, open, onOpenChange }) {
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["splitSheetComments", splitSheetId],
    queryFn: () => base44.entities.SplitSheetComment.filter(
      { split_sheet_id: splitSheetId },
      "-created_date"
    ),
    enabled: open && !!splitSheetId,
    refetchInterval: 5000, // Poll every 5 seconds for new comments
  });

  const createMutation = useMutation({
    mutationFn: async (commentText) => {
      return base44.entities.SplitSheetComment.create({
        split_sheet_id: splitSheetId,
        comment_text: commentText,
        author_email: user.email,
        author_name: user.full_name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["splitSheetComments"] });
      setNewComment("");
      toast.success("Comment added");
    },
    onError: () => {
      toast.error("Failed to add comment");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createMutation.mutate(newComment.trim());
    }
  };

  // Subscribe to real-time updates
  useEffect(() => {
    if (!splitSheetId || !open) return;

    const unsubscribe = base44.entities.SplitSheetComment.subscribe((event) => {
      if (event.data.split_sheet_id === splitSheetId) {
        queryClient.invalidateQueries({ queryKey: ["splitSheetComments"] });
      }
    });

    return unsubscribe;
  }, [splitSheetId, open, queryClient]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Discussion
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-140px)]">
          {/* Comments List */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No comments yet</p>
                <p className="text-slate-400 text-xs mt-1">Start the conversation</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className={cn(
                    "p-3 rounded-xl",
                    comment.author_email === user?.email
                      ? "bg-violet-50 dark:bg-violet-950/30 ml-8"
                      : "bg-slate-50 dark:bg-slate-800 mr-8"
                  )}
                >
                  <div className="flex items-start gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {comment.author_name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {comment.author_name || "Unknown"}
                        {comment.author_email === user?.email && (
                          <span className="text-xs text-violet-600 dark:text-violet-400 ml-1">
                            (you)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {format(new Date(comment.created_date), "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 ml-9">
                    {comment.comment_text}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* New Comment Form */}
          <form onSubmit={handleSubmit} className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[80px] mb-3"
              disabled={createMutation.isPending}
            />
            <Button
              type="submit"
              disabled={!newComment.trim() || createMutation.isPending}
              className="w-full bg-violet-600 hover:bg-violet-700"
            >
              {createMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Send Comment
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}