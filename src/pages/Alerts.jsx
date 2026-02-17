import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  ArrowLeft, Bell, AlertTriangle, FileWarning, 
  CreditCard, PenTool, AlertOctagon, CheckCircle,
  Loader2, Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const alertIcons = {
  fraud_warning: AlertOctagon,
  contract_risk: FileWarning,
  payment_due: CreditCard,
  signature_needed: PenTool,
  dispute: AlertTriangle,
  system: Bell,
};

const severityConfig = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
  critical: {
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
};

export default function Alerts() {
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["allAlerts"],
    queryFn: () => base44.entities.Alert.list("-created_date", 50),
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => base44.entities.Alert.update(id, { read: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Alert.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast.success("Alert deleted");
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      const unread = alerts.filter(a => !a.read);
      await Promise.all(unread.map(a => base44.entities.Alert.update(a.id, { read: true })));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast.success("All alerts marked as read");
    },
  });

  const unreadCount = alerts.filter(a => !a.read).length;

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
              <h1 className="text-xl font-bold text-slate-900">Alerts</h1>
              <p className="text-sm text-slate-500">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllReadMutation.mutate()}
              disabled={markAllReadMutation.isPending}
            >
              {markAllReadMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Mark all read
                </>
              )}
            </Button>
          )}
        </div>

        {/* Alerts List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">No alerts</h3>
            <p className="text-slate-500 text-sm">
              You're all caught up! We'll notify you of important updates.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = alertIcons[alert.type] || Bell;
              const config = severityConfig[alert.severity] || severityConfig.info;

              return (
                <div
                  key={alert.id}
                  className={cn(
                    "rounded-2xl border p-4 transition-all",
                    alert.read ? "bg-white border-slate-100" : config.bg,
                    alert.read ? "" : config.border
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      alert.read ? "bg-slate-100" : config.iconBg
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        alert.read ? "text-slate-400" : config.iconColor
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={cn(
                            "font-semibold",
                            alert.read ? "text-slate-600" : "text-slate-900"
                          )}>
                            {alert.title}
                          </p>
                          <p className={cn(
                            "text-sm mt-0.5",
                            alert.read ? "text-slate-400" : "text-slate-600"
                          )}>
                            {alert.message}
                          </p>
                        </div>
                        {!alert.read && (
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0",
                            config.badge
                          )}>
                            {alert.severity}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-slate-400">
                          {format(new Date(alert.created_date), "MMM d, h:mm a")}
                        </span>
                        <div className="flex items-center gap-2">
                          {!alert.read && (
                            <button
                              onClick={() => markReadMutation.mutate(alert.id)}
                              className="text-xs text-violet-600 font-medium hover:underline"
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => deleteMutation.mutate(alert.id)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
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