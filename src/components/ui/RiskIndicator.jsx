import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, AlertOctagon, Info } from "lucide-react";

export default function RiskIndicator({ level, showLabel = true, className }) {
  const configs = {
    low: { 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10",
      label: "Low Risk",
      Icon: CheckCircle 
    },
    medium: { 
      color: "text-amber-500", 
      bg: "bg-amber-500/10",
      label: "Medium Risk",
      Icon: Info 
    },
    high: { 
      color: "text-orange-500", 
      bg: "bg-orange-500/10",
      label: "High Risk",
      Icon: AlertTriangle 
    },
    critical: { 
      color: "text-red-500", 
      bg: "bg-red-500/10",
      label: "Critical Risk",
      Icon: AlertOctagon 
    }
  };

  const config = configs[level] || configs.medium;
  const Icon = config.Icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
      config.bg, className
    )}>
      <Icon className={cn("w-4 h-4", config.color)} />
      {showLabel && (
        <span className={cn("text-sm font-medium", config.color)}>
          {config.label}
        </span>
      )}
    </div>
  );
}