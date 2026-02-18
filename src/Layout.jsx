import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, FileText, Users, Wallet, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";
import NotificationManager from "../components/notifications/NotificationManager";

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overscroll-behavior-none">
      <Toaster position="top-center" />
      <NotificationManager />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPageName}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 px-2 pb-safe z-50">
          <div className="max-w-lg mx-auto flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors select-none",
                    isActive ? "text-violet-600 dark:text-violet-400" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                >
                  <item.icon className={cn(
                    "w-6 h-6",
                    isActive && "fill-violet-100 dark:fill-violet-900"
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