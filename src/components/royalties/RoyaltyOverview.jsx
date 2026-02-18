import React from "react";
import { format } from "date-fns";
import { Music, DollarSign, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: {
    icon: Clock,
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    text: "text-amber-600"
  },
  paid: {
    icon: CheckCircle,
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    text: "text-emerald-600"
  },
  disputed: {
    icon: Clock,
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    text: "text-red-600"
  }
};

export default function RoyaltyOverview({ reports }) {
  return (
    <div className="space-y-3">
      {reports.map((report) => {
        const config = statusConfig[report.status];
        const Icon = config.icon;

        return (
          <div
            key={report.id}
            className="bg-white rounded-2xl border border-slate-100 p-4"
          >
            <div className="flex items-start gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.iconBg)}>
                <Music className={cn("w-5 h-5", config.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{report.song_title}</p>
                    <p className="text-sm text-slate-500">{report.split_percentage}% split</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">
                      ${report.calculated_amount.toFixed(2)}
                    </p>
                    <div className={cn("flex items-center gap-1 text-xs capitalize", config.text)}>
                      <Icon className="w-3 h-3" />
                      {report.status}
                    </div>
                  </div>
                </div>
                {report.period_start && report.period_end && (
                  <p className="text-xs text-slate-400 mt-2">
                    {format(new Date(report.period_start), "MMM d")} - {format(new Date(report.period_end), "MMM d, yyyy")}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}