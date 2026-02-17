import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, FileText, Users, Wallet, 
  MessageSquare, Settings, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const navItems = [
  { icon: Home, label: "Home", page: "Dashboard" },
  { icon: FileText, label: "Contracts", page: "ContractAnalyzer" },
  { icon: Users, label: "Splits", page: "SplitSheetBuilder" },
  { icon: Wallet, label: "Wallet", page: "Wallet" },
  { icon: Settings, label: "Settings", page: "Settings" },
];

export default function Layout({ children, currentPageName }) {
  const hideNav = ["AIAdvisor"].includes(currentPageName);

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      
      {children}

      {/* Bottom Navigation */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-2 pb-safe z-50">
          <div className="max-w-lg mx-auto flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors",
                    isActive ? "text-violet-600" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <item.icon className={cn(
                    "w-6 h-6",
                    isActive && "fill-violet-100"
                  )} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}