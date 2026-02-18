import React from "react";
import { 
  AlertTriangle, CheckCircle, FileText, 
  Calendar, DollarSign, User, ChevronDown,
  AlertOctagon, Info, Scale, TrendingDown,
  TrendingUp, Lightbulb, Shield
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

      {/* Industry Standards Comparison */}
      {contract.industry_standards?.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Industry Standards Comparison</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              How this contract compares to typical industry practices
            </p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {contract.industry_standards.map((standard, idx) => (
              <div key={idx} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    standard.is_favorable 
                      ? "bg-emerald-100 dark:bg-emerald-900/30" 
                      : "bg-red-100 dark:bg-red-900/30"
                  )}>
                    {standard.is_favorable ? (
                      <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                      {standard.category}
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          This Contract:
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {standard.contract_term}
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
                        <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                          Industry Standard:
                        </p>
                        <p className="text-sm text-blue-900 dark:text-blue-300">
                          {standard.industry_standard}
                        </p>
                      </div>
                      <div className={cn(
                        "rounded-lg p-3",
                        standard.is_favorable 
                          ? "bg-emerald-50 dark:bg-emerald-950/30" 
                          : "bg-amber-50 dark:bg-amber-950/30"
                      )}>
                        <p className={cn(
                          "text-xs mb-1 font-medium",
                          standard.is_favorable 
                            ? "text-emerald-700 dark:text-emerald-400" 
                            : "text-amber-700 dark:text-amber-400"
                        )}>
                          Impact:
                        </p>
                        <p className={cn(
                          "text-sm",
                          standard.is_favorable 
                            ? "text-emerald-800 dark:text-emerald-300" 
                            : "text-amber-800 dark:text-amber-300"
                        )}>
                          {standard.deviation_impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Problematic Clauses with Fairer Alternatives */}
      {contract.problematic_clauses?.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Problematic Clauses & Fairer Alternatives</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Non-standard or disadvantageous terms with suggested improvements
            </p>
          </div>
          <Accordion type="multiple" className="w-full">
            {contract.problematic_clauses.map((clause, idx) => (
              <AccordionItem key={idx} value={`problem-${idx}`}>
                <AccordionTrigger className="px-5 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      clause.severity === "critical" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      clause.severity === "high" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                      {clause.severity}
                    </div>
                    <span className="font-medium text-left">{clause.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4">
                  <div className="space-y-4">
                    {/* Original Clause */}
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                        Original Clause:
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-3 border-l-4 border-red-500">
                        <p className="text-sm text-slate-700 dark:text-slate-300 font-mono">
                          {clause.clause_text}
                        </p>
                      </div>
                    </div>

                    {/* Why Problematic */}
                    <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">
                            Why This Is Problematic:
                          </p>
                          <p className="text-sm text-red-800 dark:text-red-300">
                            {clause.why_problematic}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Fairer Alternative */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                            Fairer Alternative to Negotiate:
                          </p>
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border-l-4 border-emerald-500">
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {clause.fairer_alternative}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Warnings */}
      {contract.warnings?.length > 0 && (
        <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-5 border border-red-100 dark:border-red-900">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h3 className="font-semibold text-red-900 dark:text-red-300">Critical Warnings</h3>
          </div>
          <ul className="space-y-2">
            {contract.warnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                <span className="text-red-400 dark:text-red-500 mt-1">•</span>
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