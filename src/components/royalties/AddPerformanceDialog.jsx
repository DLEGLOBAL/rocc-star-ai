import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AddPerformanceDialog({ open, onClose, splitSheets }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    split_sheet_id: "",
    total_revenue: "",
    total_streams: "",
    platform: "spotify",
    period_start: "",
    period_end: "",
    notes: ""
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const selectedSheet = splitSheets.find(s => s.id === data.split_sheet_id);
      
      // Create performance record
      const performance = await base44.entities.SongPerformance.create({
        split_sheet_id: data.split_sheet_id,
        song_title: selectedSheet.title,
        total_revenue: parseFloat(data.total_revenue),
        total_streams: data.total_streams ? parseInt(data.total_streams) : 0,
        platform: data.platform,
        period_start: data.period_start,
        period_end: data.period_end,
        notes: data.notes
      });

      // Calculate and create royalty reports for each collaborator
      const reports = selectedSheet.splits.map(split => ({
        performance_id: performance.id,
        split_sheet_id: data.split_sheet_id,
        song_title: selectedSheet.title,
        collaborator_email: split.collaborator_email,
        collaborator_name: split.collaborator_name,
        split_percentage: split.percentage,
        calculated_amount: (parseFloat(data.total_revenue) * split.percentage) / 100,
        status: "pending",
        period_start: data.period_start,
        period_end: data.period_end
      }));

      await base44.entities.RoyaltyReport.bulkCreate(reports);

      return performance;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["royaltyReports"] });
      toast.success("Performance data added and royalties calculated");
      setFormData({
        split_sheet_id: "",
        total_revenue: "",
        total_streams: "",
        platform: "spotify",
        period_start: "",
        period_end: "",
        notes: ""
      });
      onClose();
    },
    onError: () => {
      toast.error("Failed to add performance data");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.split_sheet_id || !formData.total_revenue) {
      toast.error("Please select a song and enter revenue");
      return;
    }
    createMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Song Performance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Song / Split Sheet</Label>
            <Select
              value={formData.split_sheet_id}
              onValueChange={(value) => setFormData({ ...formData, split_sheet_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a song" />
              </SelectTrigger>
              <SelectContent>
                {splitSheets.filter(s => s.status === "active").map((sheet) => (
                  <SelectItem key={sheet.id} value={sheet.id}>
                    {sheet.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Total Revenue ($)</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.total_revenue}
              onChange={(e) => setFormData({ ...formData, total_revenue: e.target.value })}
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Total Streams (optional)</Label>
              <Input
                type="number"
                value={formData.total_streams}
                onChange={(e) => setFormData({ ...formData, total_streams: e.target.value })}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Platform</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spotify">Spotify</SelectItem>
                  <SelectItem value="apple_music">Apple Music</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tidal">Tidal</SelectItem>
                  <SelectItem value="amazon_music">Amazon Music</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Period Start</Label>
              <Input
                type="date"
                value={formData.period_start}
                onChange={(e) => setFormData({ ...formData, period_start: e.target.value })}
              />
            </div>
            <div>
              <Label>Period End</Label>
              <Input
                type="date"
                value={formData.period_end}
                onChange={(e) => setFormData({ ...formData, period_end: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Notes (optional)</Label>
            <Input
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any notes..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 bg-violet-600 hover:bg-violet-700"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                "Calculate Royalties"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}