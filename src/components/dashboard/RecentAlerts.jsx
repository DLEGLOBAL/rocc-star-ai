import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { AlertTriangle, FileWarning, CreditCard, PenTool, AlertOctagon, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const alertIcons = {
  fraud_warning: AlertOctagon,
  contract_risk: FileWarning,
  payment_due: CreditCard,
  signature_needed: PenTool,
  dispute: AlertTriangle,
  system: Bell
};

const severityStyles = {
  info: "bg-blue-50 border-blue-100 text-blue-600",
  warning: "bg-amber-50 border-amber-100 text-amber-600",
  critical: "bg-red-50 border-red-100 text-red-600"
};

export default function RecentAlerts({ alerts = [] }) {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <Bell className="w-6 h-6 text-slate-300" />
        </div>
        <p className="text-sm text-slate-400">No alerts</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {alerts.slice(0, 5).map((alert) => {
        const Icon = alertIcons[alert.type] || Bell;
        return (
          <Link
            key={alert.id}
            to={createPageUrl("Alerts")}
            className={cn(
              "flex items-start gap-3 p-3 rounded-xl border transition-all",
              "hover:shadow-sm",
              severityStyles[alert.severity]
            )}
          >
            <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-slate-900 truncate">
                {alert.title}
              </p>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {alert.message}
              </p>
            </div>
            <span className="text-xs text-slate-400 flex-shrink-0">
              {format(new Date(alert.created_date), "MMM d")}
            </span>
          </Link>
        );
      })}
    </div>
  );
}