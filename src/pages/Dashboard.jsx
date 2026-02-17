import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, FileText, Users, Shield, TrendingUp, AlertTriangle } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentAlerts from "../components/dashboard/RecentAlerts";
import RecentContracts from "../components/dashboard/RecentContracts";
import TrustScoreBadge from "../components/ui/TrustScoreBadge";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error("User not authenticated");
      }
    };
    loadUser();
  }, []);

  const { data: trustProfile } = useQuery({
    queryKey: ["trustProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const profiles = await base44.entities.TrustProfile.filter({ user_email: user.email });
      return profiles[0] || null;
    },
    enabled: !!user?.email,
    initialData: null
  });

  const { data: contracts = [] } = useQuery({
    queryKey: ["contracts"],
    queryFn: () => base44.entities.Contract.list("-created_date", 10),
    initialData: []
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => base44.entities.Alert.filter({ read: false }, "-created_date", 10),
    initialData: []
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => base44.entities.Transaction.list("-created_date", 20),
    initialData: []
  });

  const totalRevenue = transactions
    .filter(t => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const activeContracts = contracts.filter(c => c.status === "signed" || c.status === "analyzed").length;
  const criticalAlerts = alerts.filter(a => a.severity === "critical").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">
              Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
            </h1>
            <p className="text-slate-500">Protect your deals, track your revenue</p>
          </div>
          {trustProfile && (
            <TrustScoreBadge score={trustProfile.trust_score || 0} size="lg" />
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend="+12.5%"
            trendDirection="up"
          />
          <StatCard
            title="Active Contracts"
            value={activeContracts}
            icon={FileText}
            subtitle="Protected deals"
          />
          <StatCard
            title="Split Sheets"
            value={contracts.filter(c => c.contract_type === "collaboration").length}
            icon={Users}
          />
          <StatCard
            title="Security Alerts"
            value={criticalAlerts}
            icon={criticalAlerts > 0 ? AlertTriangle : Shield}
            className={criticalAlerts > 0 ? "border-red-200" : ""}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
              <QuickActions />
            </div>
          </div>

          {/* Recent Contracts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Recent Contracts</h2>
                <span className="text-sm text-slate-400">{contracts.length} total</span>
              </div>
              <RecentContracts contracts={contracts} />
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Security Alerts</h2>
              <RecentAlerts alerts={alerts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}