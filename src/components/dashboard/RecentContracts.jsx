import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import RiskIndicator from "../ui/RiskIndicator";

const statusStyles = {
  pending_review: "bg-slate-100 text-slate-600",
  analyzed: "bg-blue-100 text-blue-600",
  signed: "bg-emerald-100 text-emerald-600",
  disputed: "bg-red-100 text-red-600",
  expired: "bg-slate-100 text-slate-400"
};

export default function RecentContracts({ contracts = [] }) {
  if (contracts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <FileText className="w-6 h-6 text-slate-300" />
        </div>
        <p className="text-sm text-slate-400">No contracts yet</p>
        <Link 
          to={createPageUrl("ContractAnalyzer")}
          className="text-sm text-violet-600 font-medium mt-2 inline-block hover:underline"
        >
          Upload your first contract
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {contracts.slice(0, 4).map((contract) => (
        <Link
          key={contract.id}
          to={`${createPageUrl("ContractAnalyzer")}?id=${contract.id}`}
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl",
            "bg-slate-50/50 hover:bg-slate-50",
            "transition-all duration-200 group"
          )}
        >
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-100">
            <FileText className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-slate-900 truncate">
              {contract.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                statusStyles[contract.status]
              )}>
                {contract.status?.replace(/_/g, " ")}
              </span>
              {contract.risk_level && (
                <RiskIndicator level={contract.risk_level} showLabel={false} />
              )}
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
        </Link>
      ))}
    </div>
  );
}