import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Sparkles, FileText, Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContractUploader from "../components/contracts/ContractUploader";
import ContractAnalysis from "../components/contracts/ContractAnalysis";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ContractAnalyzer() {
  const [searchParams] = useSearchParams();
  const contractId = searchParams.get("id");
  const queryClient = useQueryClient();
  
  const [step, setStep] = useState(contractId ? "view" : "upload");
  const [analyzing, setAnalyzing] = useState(false);
  const [contractTitle, setContractTitle] = useState("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: () => base44.entities.Contract.list("-created_date", 20),
  });

  const { data: selectedContract, isLoading: loadingContract } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => base44.entities.Contract.filter({ id: contractId }),
    enabled: !!contractId,
    select: (data) => data[0],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Contract.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });

  const handleUploadComplete = (fileUrl, fileName) => {
    setUploadedFileUrl(fileUrl);
    setContractTitle(fileName.replace(/\.[^/.]+$/, ""));
    setStep("details");
  };

  const analyzeContract = async () => {
    if (!uploadedFileUrl || !contractTitle) return;
    
    setAnalyzing(true);
    try {
      // Create contract record first
      const newContract = await createMutation.mutateAsync({
        title: contractTitle,
        file_url: uploadedFileUrl,
        status: "pending_review",
      });

      // Analyze with AI
      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze this music industry contract and extract key information. Be thorough but explain everything in plain English that an artist would understand.

Contract file: ${uploadedFileUrl}

Extract and provide:
1. Contract type (recording, publishing, sync, distribution, management, producer, collaboration, or other)
2. Counterparty name
3. Risk score (0-100, where 100 is highest risk)
4. Risk level (low, medium, high, or critical)
5. Total estimated value if mentioned
6. Royalty rate if mentioned
7. Effective and expiration dates if mentioned
8. A plain English summary (2-3 paragraphs explaining what this contract means for the artist)
9. List of warnings (predatory clauses, unfair terms, missing protections)
10. Key clauses with their titles, original text, whether they're risky, and plain English explanations

Be especially alert for:
- 360 deals or rights grabs
- Perpetual or lifetime terms
- Unreasonable exclusivity
- Poor royalty splits
- Hidden fees or recoupment terms
- Vague termination clauses`,
        file_urls: [uploadedFileUrl],
        response_json_schema: {
          type: "object",
          properties: {
            contract_type: { type: "string" },
            counterparty: { type: "string" },
            risk_score: { type: "number" },
            risk_level: { type: "string" },
            total_value: { type: "number" },
            royalty_rate: { type: "number" },
            effective_date: { type: "string" },
            expiration_date: { type: "string" },
            ai_summary: { type: "string" },
            warnings: { type: "array", items: { type: "string" } },
            clauses: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  text: { type: "string" },
                  risk_flag: { type: "boolean" },
                  explanation: { type: "string" }
                }
              }
            }
          }
        }
      });

      // Update contract with analysis
      await base44.entities.Contract.update(newContract.id, {
        ...analysis,
        status: "analyzed",
      });

      // Create alert if high risk
      if (analysis.risk_level === "high" || analysis.risk_level === "critical") {
        await base44.entities.Alert.create({
          type: "contract_risk",
          severity: analysis.risk_level === "critical" ? "critical" : "warning",
          title: `High-Risk Contract Detected`,
          message: `"${contractTitle}" has been flagged with ${analysis.warnings?.length || 0} warnings.`,
          related_entity_type: "Contract",
          related_entity_id: newContract.id,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast.success("Contract analyzed successfully");
      setStep("upload");
      setUploadedFileUrl(null);
      setContractTitle("");
    } catch (error) {
      toast.error("Failed to analyze contract");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to={createPageUrl("Dashboard")}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Contract Analyzer
            </h1>
            <p className="text-sm text-slate-500">
              AI-powered deal intelligence
            </p>
          </div>
        </div>

        {/* View Selected Contract */}
        {contractId && selectedContract ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">{selectedContract.title}</h2>
              <Link 
                to={createPageUrl("ContractAnalyzer")}
                className="text-sm text-violet-600 font-medium"
              >
                ← Back to list
              </Link>
            </div>
            {loadingContract ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
              </div>
            ) : (
              <ContractAnalysis contract={selectedContract} />
            )}
          </div>
        ) : (
          <>
            {/* Upload Step */}
            {step === "upload" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-6 h-6" />
                    <h2 className="font-semibold">AI Contract Analysis</h2>
                  </div>
                  <p className="text-violet-100 text-sm">
                    Upload any music contract and get instant insights on risk, 
                    unfair terms, and what it means for you.
                  </p>
                </div>

                <ContractUploader onUploadComplete={handleUploadComplete} />

                {/* Recent Contracts */}
                {contracts.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">
                      Recent Contracts
                    </h3>
                    <div className="space-y-2">
                      {contracts.slice(0, 5).map((contract) => (
                        <Link
                          key={contract.id}
                          to={`${createPageUrl("ContractAnalyzer")}?id=${contract.id}`}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                        >
                          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-slate-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 truncate">
                              {contract.title}
                            </p>
                            <p className="text-xs text-slate-400 capitalize">
                              {contract.status?.replace(/_/g, " ")}
                            </p>
                          </div>
                          {contract.risk_score !== undefined && (
                            <span className={cn(
                              "text-sm font-semibold px-2 py-1 rounded-lg",
                              contract.risk_score >= 70 ? "bg-red-100 text-red-600" :
                              contract.risk_score >= 40 ? "bg-amber-100 text-amber-600" :
                              "bg-emerald-100 text-emerald-600"
                            )}>
                              {contract.risk_score}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Details Step */}
            {step === "details" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                  <h3 className="font-semibold text-slate-900 mb-4">
                    Contract Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                        Contract Name
                      </label>
                      <Input
                        value={contractTitle}
                        onChange={(e) => setContractTitle(e.target.value)}
                        placeholder="e.g., Sony Publishing Deal"
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep("upload");
                      setUploadedFileUrl(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={analyzeContract}
                    disabled={analyzing || !contractTitle}
                    className="flex-1 bg-violet-600 hover:bg-violet-700"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}