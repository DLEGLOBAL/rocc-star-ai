import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, TrendingUp, DollarSign, Music, 
  Plus, Calendar, Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoyaltyOverview from "../components/royalties/RoyaltyOverview";
import RoyaltyBySong from "../components/royalties/RoyaltyBySong";
import AddPerformanceDialog from "../components/royalties/AddPerformanceDialog";

export default function Royalties() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const { data: royaltyReports = [], isLoading } = useQuery({
    queryKey: ["royaltyReports", user?.email],
    queryFn: () => base44.entities.RoyaltyReport.filter({ 
      collaborator_email: user.email 
    }, "-created_date", 100),
    enabled: !!user?.email,
  });

  const { data: splitSheets = [] } = useQuery({
    queryKey: ["splitSheets", user?.email],
    queryFn: () => base44.entities.SplitSheet.filter({ created_by: user.email }),
    enabled: !!user?.email,
  });

  const totalPending = royaltyReports
    .filter(r => r.status === "pending")
    .reduce((sum, r) => sum + r.calculated_amount, 0);

  const totalPaid = royaltyReports
    .filter(r => r.status === "paid")
    .reduce((sum, r) => sum + r.calculated_amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to={createPageUrl("Dashboard")}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Royalties</h1>
              <p className="text-sm text-slate-500">Automated calculations</p>
            </div>
          </div>
          <Button
            onClick={() => setShowAddDialog(true)}
            size="sm"
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Performance
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-xs text-slate-500">Pending</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ${totalPending.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs text-slate-500">Paid</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ${totalPaid.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          </div>
        ) : royaltyReports.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">No royalties yet</h3>
            <p className="text-slate-500 text-sm mb-4">
              Add song performance data to calculate royalties
            </p>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-violet-600 hover:bg-violet-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Performance Data
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="by-song">By Song</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <RoyaltyOverview reports={royaltyReports} />
            </TabsContent>
            <TabsContent value="by-song">
              <RoyaltyBySong reports={royaltyReports} />
            </TabsContent>
          </Tabs>
        )}

        <AddPerformanceDialog 
          open={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          splitSheets={splitSheets}
        />
      </div>
    </div>
  );
}