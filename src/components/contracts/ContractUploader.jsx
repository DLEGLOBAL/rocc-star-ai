import React, { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ContractUploader({ onUploadComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndSetFile = (file) => {
    const validTypes = ["application/pdf", "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }
    setFile(file);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onUploadComplete(file_url, file.name);
      toast.success("Contract uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload contract");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200",
            isDragging 
              ? "border-violet-400 bg-violet-50" 
              : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
          )}
        >
          <input
            type="file"
            id="contract-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
          />
          <label htmlFor="contract-upload" className="cursor-pointer">
            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-violet-600" />
            </div>
            <p className="font-semibold text-slate-900 mb-1">
              Upload your contract
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Drag & drop or click to browse
            </p>
            <p className="text-xs text-slate-400">
              PDF or Word documents up to 10MB
            </p>
          </label>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">{file.name}</p>
              <p className="text-sm text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={removeFile}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full mt-4 bg-violet-600 hover:bg-violet-700"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Analyze Contract"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}