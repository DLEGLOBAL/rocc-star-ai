import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { History, RotateCcw, Clock, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function VersionHistory({ splitSheetId, open, onOpenChange, currentSheet }) {
  const queryClient = useQueryClient();

  const { data: versions = [], isLoading } = useQuery({
    queryKey: ["splitSheetVersions", splitSheetId],
    queryFn: () => base44.entities.SplitSheetVersion.filter(
      { split_sheet_id: splitSheetId },
      "-version_number"
    ),
    enabled: open && !!splitSheetId,
  });

  const revertMutation = useMutation({
    mutationFn: async ({ versionId, snapshot }) => {
      // Update the split sheet with the snapshot data
      await base44.entities.SplitSheet.update(splitSheetId, snapshot);
      
      // Create a new version entry for this revert
      const user = await base44.auth.me();
      const newVersionNumber = versions[0]?.version_number + 1 || 1;
      
      await base44.entities.SplitSheetVersion.create({
        split_sheet_id: splitSheetId,
        version_number: newVersionNumber,
        snapshot: snapshot,
        change_summary: `Reverted to version ${versionId}`,
        changed_by_email: user.email,
        changed_by_name: user.full_name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["splitSheets"] });
      queryClient.invalidateQueries({ queryKey: ["splitSheetVersions"] });
      toast.success("Reverted to previous version");
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Failed to revert version");
    },
  });

  const handleRevert = (version) => {
    if (confirm(`Revert to version ${version.version_number}? Current changes will be saved as a new version.`)) {
      revertMutation.mutate({ versionId: version.version_number, snapshot: version.snapshot });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Version History
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          </div>
        ) : versions.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No version history yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {versions.map((version, idx) => {
              const isLatest = idx === 0;
              return (
              <div
                key={version.id}
                className={cn(
                  "p-4 rounded-xl border transition-colors",
                  isLatest
                    ? "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-900" 
                    : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        v{version.version_number}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {version.change_summary || "Changes made"}
                        {isLatest && (
                          <span className="ml-2 text-xs bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-400 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {version.changed_by_name || "Unknown"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(version.created_date), "MMM d, h:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isLatest && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRevert(version)}
                      disabled={revertMutation.isPending}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Revert
                    </Button>
                  )}
                </div>
                
                {/* Show changes summary */}
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                  <p className="font-medium text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Collaborators:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {version.snapshot?.splits?.map((split, i) => (
                      <span key={i} className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                        {split.collaborator_name}: {split.percentage}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}