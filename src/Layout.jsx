import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, FileText, Users, Wallet, Settings, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";
import NotificationManager from "./components/notifications/NotificationManager";
import { ThemeProvider, useTheme } from "next-themes";

const navItems = [
  { icon: Home, label: "Home", page: "Dashboard" },
  { icon: FileText, label: "Contracts", page: "ContractAnalyzer" },
  { icon: Users, label: "Splits", page: "SplitSheetBuilder" },
  { icon: Wallet, label: "Royalties", page: "Royalties" },
  { icon: Settings, label: "Settings", page: "Settings" },
];

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute rounded-full orb-float-1"
        style={{
          top: "-10%", left: "-8%",
          width: "520px", height: "520px",
          background: "radial-gradient(circle, rgba(124,58,237,0.55), transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.22,
        }}
      />
      <div
        className="absolute rounded-full orb-float-2"
        style={{
          top: "35%", right: "-6%",
          width: "420px", height: "420px",
          background: "radial-gradient(circle, rgba(37,99,235,0.55), transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.18,
        }}
      />
      <div
        className="absolute rounded-full orb-float-3"
        style={{
          bottom: "-8%", left: "18%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(147,51,234,0.5), transparent 70%)",
          filter: "blur(50px)",
          opacity: 0.15,
        }}
      />
      <div
        className="absolute rounded-full orb-float-1"
        style={{
          top: "58%", right: "25%",
          width: "280px", height: "280px",
          background: "radial-gradient(circle, rgba(236,72,153,0.5), transparent 70%)",
          filter: "blur(35px)",
          opacity: 0.14,
          animationDuration: "16s",
          animationDirection: "reverse",
        }}
      />
      {/* subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "fixed top-4 right-4 z-50 w-14 h-7 rounded-full flex items-center px-[3px] transition-all duration-300 border",
        isDark
          ? "bg-violet-600 border-violet-500 shadow-lg shadow-violet-600/40"
          : "bg-slate-200 border-slate-300 shadow-md"
      )}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={cn(
          "w-[22px] h-[22px] rounded-full flex items-center justify-center bg-white",
          isDark ? "ml-auto shadow" : "mr-auto shadow-sm"
        )}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-violet-600" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}

function LayoutContent({ children, currentPageName }) {
  const hideNav = ["AIAdvisor"].includes(currentPageName);

  return (
    <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300">
      <AnimatedBackground />
      <Toaster position="top-center" />
      <NotificationManager />
      <ThemeToggle />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPageName}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-slate-100 dark:border-white/10 px-2 pb-safe z-50">
          <div className="max-w-lg mx-auto flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors select-none",
                    isActive
                      ? "text-violet-600 dark:text-violet-400"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-6 h-6",
                      isActive && "fill-violet-100 dark:fill-violet-900"
                    )}
                  />
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

export default function Layout({ children, currentPageName }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LayoutContent children={children} currentPageName={currentPageName} />
    </ThemeProvider>
  );
}