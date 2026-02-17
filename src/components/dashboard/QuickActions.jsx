import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, Users, MessageSquare, Wallet, Upload, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { 
    label: "Analyze Contract", 
    icon: FileText, 
    page: "ContractAnalyzer",
    color: "bg-violet-500",
    description: "Upload & scan deals"
  },
  { 
    label: "Create Split", 
    icon: Users, 
    page: "SplitSheetBuilder",
    color: "bg-blue-500",
    description: "Set up revenue shares"
  },
  { 
    label: "AI Advisor", 
    icon: MessageSquare, 
    page: "AIAdvisor",
    color: "bg-emerald-500",
    description: "Get deal guidance"
  },
  { 
    label: "Wallet", 
    icon: Wallet, 
    page: "Wallet",
    color: "bg-amber-500",
    description: "Manage payouts"
  }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <Link
          key={action.page}
          to={createPageUrl(action.page)}
          className={cn(
            "group relative overflow-hidden rounded-2xl p-5",
            "bg-white border border-slate-100",
            "hover:border-slate-200 hover:shadow-lg",
            "transition-all duration-300"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
            action.color
          )}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <p className="font-semibold text-slate-900 group-hover:text-slate-700">
            {action.label}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {action.description}
          </p>
          <div className={cn(
            "absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-5",
            action.color
          )} />
        </Link>
      ))}
    </div>
  );
}