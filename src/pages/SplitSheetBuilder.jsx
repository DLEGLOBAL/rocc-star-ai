import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Users, AlertTriangle, CheckCircle, Send } from "lucide-react";

export default function SplitSheetBuilder() {
  const [newSheet, setNewSheet] = useState({
    title: "",
    release_date: "",
    isrc: "",
    splits: [{ collaborator_name: "", collaborator_email: "", role: "Producer", percentage: 50 }]
  });

  const queryClient = useQueryClient();

  const { data: splitSheets = [] } = useQuery({
    queryKey: ["splitSheets"],
    queryFn: () => base44.entities.SplitSheet.list("-created_date", 50),
    initialData: []
  });

  const createSheetMutation = useMutation({
    mutationFn: async (data) => {
      const sheet = await base44.entities.SplitSheet.create(data);
      
      // Send email invitations to collaborators
      for (const split of data.splits) {
        if (split.collaborator_email) {
          await base44.integrations.Core.SendEmail({
            to: split.collaborator_email,
            subject: `Split Sheet Invitation: ${data.title}`,
            body: `You've been invited to review and sign a split sheet for "${data.title}".\n\nYour share: ${split.percentage}%\nRole: ${split.role}\n\nLog in to Rocc$tar AI to review and sign.`
          });
        }
      }

      return sheet;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["splitSheets"] });
      setNewSheet({
        title: "",
        release_date: "",
        isrc: "",
        splits: [{ collaborator_name: "", collaborator_email: "", role: "Producer", percentage: 50 }]
      });
    }
  });

  const addCollaborator = () => {
    setNewSheet(prev => ({
      ...prev,
      splits: [...prev.splits, { collaborator_name: "", collaborator_email: "", role: "Songwriter", percentage: 0 }]
    }));
  };

  const removeCollaborator = (index) => {
    setNewSheet(prev => ({
      ...prev,
      splits: prev.splits.filter((_, i) => i !== index)
    }));
  };

  const updateSplit = (index, field, value) => {
    setNewSheet(prev => ({
      ...prev,
      splits: prev.splits.map((split, i) => 
        i === index ? { ...split, [field]: value } : split
      )
    }));
  };

  const totalPercentage = newSheet.splits.reduce((sum, split) => sum + (parseFloat(split.percentage) || 0), 0);
  const isValid = totalPercentage === 100 && newSheet.title && newSheet.splits.every(s => s.collaborator_name && s.percentage > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Split Sheet Builder</h1>
          <p className="text-slate-500">Create transparent revenue sharing agreements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Builder */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Split Sheet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Song/Project Title *</Label>
                    <Input
                      id="title"
                      value={newSheet.title}
                      onChange={(e) => setNewSheet(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter song title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="release_date">Release Date</Label>
                      <Input
                        id="release_date"
                        type="date"
                        value={newSheet.release_date}
                        onChange={(e) => setNewSheet(prev => ({ ...prev, release_date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="isrc">ISRC Code</Label>
                      <Input
                        id="isrc"
                        value={newSheet.isrc}
                        onChange={(e) => setNewSheet(prev => ({ ...prev, isrc: e.target.value }))}
                        placeholder="US-XXX-XX-XXXXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Collaborators */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Collaborators & Splits</h3>
                    <Button onClick={addCollaborator} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {newSheet.splits.map((split, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="grid grid-cols-12 gap-3 items-start">
                          <div className="col-span-4">
                            <Label className="text-xs">Name</Label>
                            <Input
                              value={split.collaborator_name}
                              onChange={(e) => updateSplit(index, "collaborator_name", e.target.value)}
                              placeholder="Full name"
                              size="sm"
                            />
                          </div>
                          <div className="col-span-4">
                            <Label className="text-xs">Email</Label>
                            <Input
                              type="email"
                              value={split.collaborator_email}
                              onChange={(e) => updateSplit(index, "collaborator_email", e.target.value)}
                              placeholder="email@example.com"
                              size="sm"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label className="text-xs">Role</Label>
                            <Input
                              value={split.role}
                              onChange={(e) => updateSplit(index, "role", e.target.value)}
                              placeholder="Role"
                              size="sm"
                            />
                          </div>
                          <div className="col-span-1">
                            <Label className="text-xs">%</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={split.percentage}
                              onChange={(e) => updateSplit(index, "percentage", parseFloat(e.target.value) || 0)}
                              size="sm"
                            />
                          </div>
                          <div className="col-span-1 pt-5">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeCollaborator(index)}
                              disabled={newSheet.splits.length === 1}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Percentage Indicator */}
                  <div className={`mt-4 p-3 rounded-lg border flex items-center justify-between ${
                    totalPercentage === 100 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
                  }`}>
                    <div className="flex items-center gap-2">
                      {totalPercentage === 100 ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      )}
                      <span className="text-sm font-medium text-slate-900">Total Split</span>
                    </div>
                    <span className={`text-lg font-bold ${
                      totalPercentage === 100 ? "text-emerald-600" : "text-amber-600"
                    }`}>
                      {totalPercentage}%
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => createSheetMutation.mutate({ ...newSheet, status: "pending_signatures" })}
                  disabled={!isValid || createSheetMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {createSheetMutation.isPending ? "Creating..." : "Create & Send for Signatures"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Split Sheets List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Split Sheets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {splitSheets.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm text-slate-400">No split sheets yet</p>
                    </div>
                  ) : (
                    splitSheets.map((sheet) => (
                      <div key={sheet.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="font-medium text-sm text-slate-900 mb-2">{sheet.title}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-1 rounded-full ${
                            sheet.status === "active" ? "bg-emerald-100 text-emerald-700" :
                            sheet.status === "pending_signatures" ? "bg-amber-100 text-amber-700" :
                            "bg-slate-100 text-slate-600"
                          }`}>
                            {sheet.status?.replace(/_/g, " ")}
                          </span>
                          <span className="text-slate-500">{sheet.splits?.length || 0} collaborators</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}