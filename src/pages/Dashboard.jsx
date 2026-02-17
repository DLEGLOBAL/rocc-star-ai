import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { 
  FileText, Users, Wallet, TrendingUp, 
  Shield, Bell, ChevronRight, Sparkles 
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import StatCard from "../components/ui/StatCard";
import TrustScoreBadge from "../components/ui/TrustScoreBadge";
import QuickActions from "../components/dashboard/QuickActions";
import RecentAlerts from "../components/dashboard/RecentAlerts";
import RecentContracts from "../components/dashboard/RecentContracts";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const { data: contracts = [], isLoading: contractsLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: () => base44.entities.Contract.list("-created_date", 10),
  });

  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => base44.entities.Alert.filter({ read: false }, "-created_date", 5),
  });

  const { data: trustProfile } = useQuery({
    queryKey: ["trustProfile", user?.email],
    queryFn: () => base44.entities.TrustProfile.filter({ user_email: user?.email }),
    enabled: !!user?.email,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => base44.entities.Transaction.filter({ status: "completed" }, "-created_date", 50),
  });

  const profile = trustProfile?.[0];
  const totalEarnings = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Hey, {user?.full_name?.split(" ")[0] || "Artist"} 👋
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Your deals are protected
            </p>
          </div>
          <Link 
            to={createPageUrl("Alerts")}
            className="relative p-2.5 bg-white rounded-full shadow-sm border border-slate-100"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {alerts.length}
              </span>
            )}
          </Link>
        </div>

        {/* Trust Score Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-violet-400" />
              <span className="text-slate-400 text-sm font-medium">Trust Score</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-5xl font-bold text-white">
                  {profile?.trust_score || 85}
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  {profile?.trust_score >= 80 ? "Highly Trusted" : "Building Trust"}
                </p>
              </div>
              <Link 
                to={createPageUrl("TrustProfile")}
                className="flex items-center gap-1 text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors"
              >
                View Profile
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            title="Total Earnings"
            value={`$${totalEarnings.toLocaleString()}`}
            icon={TrendingUp}
          />
          <StatCard
            title="Active Contracts"
            value={contracts.filter(c => c.status === "signed").length}
            icon={FileText}
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-900">Quick Actions</h2>
          </div>
          <QuickActions />
        </div>

        {/* AI Advisor Promo */}
        <Link 
          to={createPageUrl("AIAdvisor")}
          className="block bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-5 mb-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">AI Deal Advisor</p>
              <p className="text-violet-100 text-sm">
                Get instant guidance on any contract
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60" />
          </div>
        </Link>

        {/* Recent Alerts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-900">Alerts</h2>
            <Link 
              to={createPageUrl("Alerts")}
              className="text-sm text-violet-600 font-medium hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            {alertsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            ) : (
              <RecentAlerts alerts={alerts} />
            )}
          </div>
        </div>

        {/* Recent Contracts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-900">Recent Contracts</h2>
            <Link 
              to={createPageUrl("ContractAnalyzer")}
              className="text-sm text-violet-600 font-medium hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            {contractsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            ) : (
              <RecentContracts contracts={contracts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}