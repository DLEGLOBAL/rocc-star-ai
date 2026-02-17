import { cn } from "@/lib/utils";

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendDirection,
  className 
}) {
  return (
    <div className={cn(
      "bg-white rounded-2xl p-6 border border-slate-100 shadow-sm",
      "hover:shadow-md transition-shadow duration-300",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-slate-50 rounded-xl">
            <Icon className="w-5 h-5 text-slate-600" />
          </div>
        )}
      </div>
      {trend && (
        <div className={cn(
          "mt-3 text-sm font-medium",
          trendDirection === "up" ? "text-emerald-500" : "text-red-500"
        )}>
          {trendDirection === "up" ? "↑" : "↓"} {trend}
        </div>
      )}
    </div>
  );
}