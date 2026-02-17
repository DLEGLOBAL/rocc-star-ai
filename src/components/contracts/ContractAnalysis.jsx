import React from "react";
import { 
  AlertTriangle, CheckCircle, FileText, 
  Calendar, DollarSign, User, ChevronDown,
  AlertOctagon, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import RiskIndicator from "../ui/RiskIndicator";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContractAnalysis({ contract }) {
  if (!contract) return null;

  const riskScore = contract.risk_score || 0;

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className={cn(
        "rounded-2xl p-6 relative overflow-hidden",
        riskScore >= 70 ? "bg-red-50" :
        riskScore >= 40 ? "bg-amber-50" : "bg-emerald-50"
      )}>
        <div className="flex items-start justify-between">
          <div>
            <RiskIndicator level={contract.risk_level || "medium"} />
            <p className="text-3xl font-bold text-slate-900 mt-3">
              {riskScore}/100
            </p>
            <p className="text-sm text-slate-600 mt-1">Risk Score</p>
          </div>
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center",
            riskScore >= 70 ? "bg-red-100" :
            riskScore >= 40 ? "bg-amber-100" : "bg-emerald-100"
          )}>
            {riskScore >= 70 ? (
              <AlertOctagon className="w-10 h-10 text-red-500" />
            ) : riskScore >= 40 ? (
              <AlertTriangle className="w-10 h-10 text-amber-500" />
            ) : (
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            )}
          </div>
        </div>
      </div>

      {/* Contract Details */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Contract Details</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Counterparty</p>
              <p className="font-medium text-slate-900">
                {contract.counterparty || "Not specified"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Contract Type</p>
              <p className="font-medium text-slate-900 capitalize">
                {contract.contract_type?.replace(/_/g, " ") || "Not specified"}
              </p>
            </div>
          </div>
          {contract.total_value && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Estimated Value</p>
                <p className="font-medium text-slate-900">
                  ${contract.total_value?.toLocaleString()}
                </p>
              </div>
            </div>
          )}
          {contract.effective_date && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Effective Date</p>
                <p className="font-medium text-slate-900">
                  {format(new Date(contract.effective_date), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Summary */}
      {contract.ai_summary && (
        <div className="bg-violet-50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-violet-600" />
            <h3 className="font-semibold text-violet-900">Plain English Summary</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {contract.ai_summary}
          </p>
        </div>
      )}

      {/* Warnings */}
      {contract.warnings?.length > 0 && (
        <div className="bg-red-50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Warnings</h3>
          </div>
          <ul className="space-y-2">
            {contract.warnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-2 text-red-700">
                <span className="text-red-400 mt-1">•</span>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Clauses */}
      {contract.clauses?.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Key Clauses</h3>
          </div>
          <Accordion type="single" collapsible>
            {contract.clauses.map((clause, idx) => (
              <AccordionItem key={idx} value={`clause-${idx}`}>
                <AccordionTrigger className="px-5 hover:no-underline">
                  <div className="flex items-center gap-3">
                    {clause.risk_flag ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    )}
                    <span className="font-medium text-left">{clause.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4">
                  <div className="space-y-3">
                    <p className="text-slate-600 text-sm">{clause.text}</p>
                    {clause.explanation && (
                      <div className={cn(
                        "p-3 rounded-lg text-sm",
                        clause.risk_flag ? "bg-amber-50 text-amber-800" : "bg-slate-50 text-slate-600"
                      )}>
                        <p className="font-medium mb-1">What this means:</p>
                        <p>{clause.explanation}</p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}