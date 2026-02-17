import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Loader2, AlertTriangle, CheckCircle, Download } from "lucide-react";
import RiskIndicator from "../components/ui/RiskIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContractAnalyzer() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [contractData, setContractData] = useState({
    title: "",
    contract_type: "recording",
    counterparty: ""
  });

  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const contractId = urlParams.get("id");

  const { data: selectedContract } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: async () => {
      if (!contractId) return null;
      const contracts = await base44.entities.Contract.filter({ id: contractId });
      return contracts[0] || null;
    },
    enabled: !!contractId
  });

  const { data: contracts = [] } = useQuery({
    queryKey: ["contracts"],
    queryFn: () => base44.entities.Contract.list("-created_date", 50),
    initialData: []
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadedFile({ url: file_url, name: file.name });
      if (!contractData.title) {
        setContractData(prev => ({ ...prev, title: file.name.replace(/\.[^/.]+$/, "") }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const analyzeContract = async () => {
    if (!uploadedFile || !contractData.title) return;

    setAnalyzing(true);
    try {
      // AI Analysis
      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze this contract for an artist/creator. Extract key information and assess risks.

Contract Type: ${contractData.contract_type}
Counterparty: ${contractData.counterparty}

Provide a JSON response with:
- risk_score (0-100, where 100 is highest risk)
- risk_level (low/medium/high/critical)
- ai_summary (plain English 2-3 sentences)
- royalty_rate (percentage if found, or null)
- clauses (array of objects with: title, text, risk_flag boolean, explanation)
- warnings (array of strings - specific red flags found)

Be specific about concerning clauses like exclusivity, rights ownership, unfavorable payment terms, or unclear obligations.`,
        file_urls: [uploadedFile.url],
        response_json_schema: {
          type: "object",
          properties: {
            risk_score: { type: "number" },
            risk_level: { type: "string" },
            ai_summary: { type: "string" },
            royalty_rate: { type: "number" },
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
            },
            warnings: { type: "array", items: { type: "string" } }
          }
        }
      });

      // Create contract record
      await base44.entities.Contract.create({
        ...contractData,
        file_url: uploadedFile.url,
        status: "analyzed",
        ...analysis
      });

      // Create alert if high risk
      if (analysis.risk_level === "high" || analysis.risk_level === "critical") {
        await base44.entities.Alert.create({
          type: "contract_risk",
          severity: analysis.risk_level === "critical" ? "critical" : "warning",
          title: "High-Risk Contract Detected",
          message: `The contract "${contractData.title}" contains concerning clauses. Review immediately.`
        });
      }

      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      setUploadedFile(null);
      setContractData({ title: "", contract_type: "recording", counterparty: "" });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Contract Intelligence</h1>
          <p className="text-slate-500">Upload contracts for AI-powered risk analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload & Analyze Contract</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Contract Title</Label>
                  <Input
                    id="title"
                    value={contractData.title}
                    onChange={(e) => setContractData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Recording Agreement - Artist Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Contract Type</Label>
                    <Select
                      value={contractData.contract_type}
                      onValueChange={(value) => setContractData(prev => ({ ...prev, contract_type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recording">Recording</SelectItem>
                        <SelectItem value="publishing">Publishing</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="producer">Producer</SelectItem>
                        <SelectItem value="distribution">Distribution</SelectItem>
                        <SelectItem value="collaboration">Collaboration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="counterparty">Other Party</Label>
                    <Input
                      id="counterparty"
                      value={contractData.counterparty}
                      onChange={(e) => setContractData(prev => ({ ...prev, counterparty: e.target.value }))}
                      placeholder="Label/Company name"
                    />
                  </div>
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                  <input
                    type="file"
                    id="contract-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {!uploadedFile ? (
                    <label htmlFor="contract-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm text-slate-600 font-medium">Click to upload contract</p>
                      <p className="text-xs text-slate-400 mt-1">PDF or DOC up to 10MB</p>
                    </label>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-violet-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-slate-900">{uploadedFile.name}</p>
                        <p className="text-xs text-slate-400">Ready to analyze</p>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={analyzeContract}
                  disabled={!uploadedFile || !contractData.title || uploading || analyzing}
                  className="w-full bg-violet-600 hover:bg-violet-700"
                  size="lg"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Contract...
                    </>
                  ) : (
                    "Analyze Contract"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Selected Contract Details */}
            {selectedContract && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedContract.title}</CardTitle>
                      <p className="text-sm text-slate-500 mt-1">{selectedContract.counterparty}</p>
                    </div>
                    <RiskIndicator level={selectedContract.risk_level} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-slate-700 mb-2">AI Summary</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedContract.ai_summary}</p>
                  </div>

                  {selectedContract.warnings?.length > 0 && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-red-900 mb-2">Risk Warnings</p>
                          <ul className="space-y-1">
                            {selectedContract.warnings.map((warning, idx) => (
                              <li key={idx} className="text-sm text-red-700">• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedContract.clauses?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm text-slate-700 mb-3">Key Clauses</h3>
                      <div className="space-y-2">
                        {selectedContract.clauses.map((clause, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border ${
                              clause.risk_flag ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {clause.risk_flag && <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />}
                              <div>
                                <p className="font-medium text-sm text-slate-900">{clause.title}</p>
                                <p className="text-xs text-slate-600 mt-1">{clause.explanation}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="w-full" asChild>
                    <a href={selectedContract.file_url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      View Original Contract
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contracts List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contracts.map((contract) => (
                    <button
                      key={contract.id}
                      onClick={() => window.location.href = `${window.location.pathname}?id=${contract.id}`}
                      className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-slate-900 truncate">{contract.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{contract.counterparty}</p>
                        </div>
                        {contract.risk_level && (
                          <RiskIndicator level={contract.risk_level} showLabel={false} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}