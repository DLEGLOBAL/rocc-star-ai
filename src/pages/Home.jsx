import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(createPageUrl("Dashboard"));
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Loading Rocc$tar AI...</p>
      </div>
    </div>
  );
}