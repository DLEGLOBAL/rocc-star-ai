import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  ArrowLeft, Plus, Trash2, Users, Music, 
  CheckCircle, Clock, AlertTriangle, Loader2,
  Mail, Percent, UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = ["Artist", "Producer", "Writer", "Engineer", "Featured Artist", "Manager"];

const statusConfig = {
  draft: { color: "bg-slate-100 text-slate-600", icon: Clock },
  pending_signatures: { color: "bg-amber-100 text-amber-600", icon: Clock },
  active: { color: "bg-emerald-100 text-emerald-600", icon: CheckCircle },
  disputed: { color: "bg-red-100 text-red-600", icon: AlertTriangle },
};

export default function SplitSheetBuilder() {
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [newSheet, setNewSheet] = useState({
    title: "",
    isrc: "",
    splits: [{ collaborator_name: "", collaborator_email: "", role: "Artist", percentage: 100, signed: false }],
  });

  const { data: splitSheets = [], isLoading } = useQuery({
    queryKey: ["splitSheets"],
    queryFn: () => base44.entities.SplitSheet.list("-created_date", 20),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.SplitSheet.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["splitSheets"] });
      setShowCreate(false);
      setNewSheet({
        title: "",
        isrc: "",
        splits: [{ collaborator_name: "", collaborator_email: "", role: "Artist", percentage: 100, signed: false }],
      });
      toast.success("Split sheet created!");
    },
  });

  const totalPercentage = newSheet.splits.reduce((sum, s) => sum + (Number(s.percentage) || 0), 0);
  const isValidSplit = totalPercentage === 100 && newSheet.splits.every(s => s.collaborator_name && s.percentage > 0);

  const addCollaborator = () => {
    const newCollaborator = { collaborator_name: "", collaborator_email: "", role: "Writer", percentage: 0, signed: false };
    setNewSheet(prev => ({
      ...prev,
      splits: [...prev.splits, newCollaborator],
    }));
  };

  const removeCollaborator = (index) => {
    setNewSheet(prev => ({
      ...prev,
      splits: prev.splits.filter((_, i) => i !== index),
    }));
  };

  const updateSplit = (index, field, value) => {
    setNewSheet(prev => ({
      ...prev,
      splits: prev.splits.map((split, i) => 
        i === index ? { ...split, [field]: value } : split
      ),
    }));
  };

  const handleCreate = () => {
    if (!newSheet.title) {
      toast.error("Please enter a song title");
      return;
    }
    if (!isValidSplit) {
      toast.error("Splits must add up to 100%");
      return;
    }
    createMutation.mutate({
      ...newSheet,
      status: "draft",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-lg mx-auto px-4 pt-safe py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to={createPageUrl("Dashboard")}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Split Sheets</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage revenue shares</p>
            </div>
          </div>
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button className="bg-violet-600 hover:bg-violet-700 select-none">
                <Plus className="w-4 h-4 mr-2" />
                New Split
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Split Sheet</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {/* Song Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Song Title *
                    </label>
                    <Input
                      value={newSheet.title}
                      onChange={(e) => setNewSheet(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter song title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                      ISRC (optional)
                    </label>
                    <Input
                      value={newSheet.isrc}
                      onChange={(e) => setNewSheet(prev => ({ ...prev, isrc: e.target.value }))}
                      placeholder="e.g., US-XXX-23-12345"
                    />
                  </div>
                </div>

                {/* Collaborators */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-slate-700">
                      Collaborators
                    </label>
                    <span className={cn(
                      "text-sm font-medium px-2 py-0.5 rounded",
                      totalPercentage === 100 ? "bg-emerald-100 text-emerald-700" :
                      totalPercentage > 100 ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      {totalPercentage}%
                    </span>
                  </div>
                  <div className="space-y-3">
                    {newSheet.splits.map((split, index) => (
                      <div key={index} className="bg-slate-50 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Collaborator {index + 1}</span>
                          {newSheet.splits.length > 1 && (
                            <button
                              onClick={() => removeCollaborator(index)}
                              className="p-1 hover:bg-red-100 rounded text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <Input
                          placeholder="Name"
                          value={split.collaborator_name}
                          onChange={(e) => updateSplit(index, "collaborator_name", e.target.value)}
                        />
                        <Input
                          type="email"
                          placeholder="Email"
                          value={split.collaborator_email}
                          onChange={(e) => updateSplit(index, "collaborator_email", e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Select
                            value={split.role}
                            onValueChange={(value) => updateSplit(index, "role", value)}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ROLES.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="relative w-24">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={split.percentage}
                              onChange={(e) => updateSplit(index, "percentage", Number(e.target.value))}
                              className="pr-8"
                            />
                            <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={addCollaborator}
                    className="w-full mt-3"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Collaborator
                  </Button>
                </div>

                <Button
                  onClick={handleCreate}
                  disabled={createMutation.isPending || !isValidSplit || !newSheet.title}
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  {createMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create Split Sheet"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Split Sheets List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          </div>
        ) : splitSheets.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">No split sheets yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Create your first split sheet to manage revenue shares
            </p>
            <Button onClick={() => setShowCreate(true)} className="bg-violet-600 hover:bg-violet-700 select-none">
              <Plus className="w-4 h-4 mr-2" />
              Create Split Sheet
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {splitSheets.map((sheet) => {
              const StatusIcon = statusConfig[sheet.status]?.icon || Clock;
              return (
                <div
                  key={sheet.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 hover:border-slate-200 dark:hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{sheet.title}</h3>
                        {sheet.isrc && (
                          <p className="text-xs text-slate-400 dark:text-slate-500">{sheet.isrc}</p>
                        )}
                      </div>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full flex items-center gap-1",
                      statusConfig[sheet.status]?.color
                    )}>
                      <StatusIcon className="w-3 h-3" />
                      {sheet.status?.replace(/_/g, " ")}
                    </span>
                  </div>
                  
                  {/* Collaborators Preview */}
                  <div className="flex flex-wrap gap-2">
                    {sheet.splits?.slice(0, 3).map((split, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-1.5"
                      >
                        <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                          {split.collaborator_name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <span className="text-sm text-slate-700">{split.collaborator_name}</span>
                        <span className="text-sm font-semibold text-violet-600">{split.percentage}%</span>
                      </div>
                    ))}
                    {sheet.splits?.length > 3 && (
                      <div className="flex items-center gap-1 text-sm text-slate-400">
                        +{sheet.splits.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}