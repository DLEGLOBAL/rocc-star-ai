import { cn } from "@/lib/utils";
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";

export default function TrustScoreBadge({ score, size = "md", showLabel = true }) {
  const getScoreConfig = (score) => {
    if (score >= 80) return { 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10", 
      border: "border-emerald-500/20",
      label: "Highly Trusted",
      Icon: ShieldCheck 
    };
    if (score >= 60) return { 
      color: "text-blue-500", 
      bg: "bg-blue-500/10", 
      border: "border-blue-500/20",
      label: "Trusted",
      Icon: Shield 
    };
    if (score >= 40) return { 
      color: "text-amber-500", 
      bg: "bg-amber-500/10", 
      border: "border-amber-500/20",
      label: "Caution",
      Icon: ShieldAlert 
    };
    return { 
      color: "text-red-500", 
      bg: "bg-red-500/10", 
      border: "border-red-500/20",
      label: "High Risk",
      Icon: ShieldX 
    };
  };

  const config = getScoreConfig(score);
  const Icon = config.Icon;

  const sizes = {
    sm: { icon: "w-4 h-4", text: "text-xs", padding: "px-2 py-1" },
    md: { icon: "w-5 h-5", text: "text-sm", padding: "px-3 py-1.5" },
    lg: { icon: "w-6 h-6", text: "text-base", padding: "px-4 py-2" }
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-full border",
      config.bg, config.border, sizes[size].padding
    )}>
      <Icon className={cn(sizes[size].icon, config.color)} />
      <span className={cn("font-semibold", config.color, sizes[size].text)}>
        {score}
      </span>
      {showLabel && (
        <span className={cn("text-slate-600", sizes[size].text)}>
          {config.label}
        </span>
      )}
    </div>
  );
}