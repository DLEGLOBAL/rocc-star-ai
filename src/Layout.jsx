import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Wallet, 
  Shield, 
  Bell, 
  MessageSquare, 
  Settings,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", page: "Dashboard", icon: LayoutDashboard },
  { name: "Contracts", page: "ContractAnalyzer", icon: FileText },
  { name: "Split Sheets", page: "SplitSheetBuilder", icon: Users },
  { name: "Wallet", page: "Wallet", icon: Wallet },
  { name: "Trust Profile", page: "TrustProfile", icon: Shield },
  { name: "Alerts", page: "Alerts", icon: Bell },
  { name: "AI Advisor", page: "AIAdvisor", icon: MessageSquare },
  { name: "Settings", page: "Settings", icon: Settings }
];

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadAlerts, setUnreadAlerts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        base44.auth.redirectToLogin();
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const alerts = await base44.entities.Alert.filter({ read: false });
        setUnreadAlerts(alerts.length);
      } catch (error) {
        console.error("Failed to load alerts");
      }
    };
    loadAlerts();
    
    const interval = setInterval(loadAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 py-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Rocc$tar AI</h1>
              <p className="text-xs text-slate-400">Deal Intelligence</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-1">
              {navigation.map((item) => {
                const isActive = currentPageName === item.page;
                return (
                  <li key={item.name}>
                    <Link
                      to={createPageUrl(item.page)}
                      className={cn(
                        "group flex gap-x-3 rounded-lg p-3 text-sm font-semibold transition-all",
                        isActive
                          ? "bg-slate-800 text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                      {item.page === "Alerts" && unreadAlerts > 0 && (
                        <span className="ml-auto inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                          {unreadAlerts}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info */}
          {user && (
            <div className="mt-auto pt-6 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                  {user.email[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.full_name || user.email.split('@')[0]}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center gap-x-6 bg-slate-900 px-4 py-4 shadow-sm">
        <button
          type="button"
          className="text-white"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Rocc$tar AI</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-slate-900/80" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-slate-900 px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Rocc$tar AI</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav>
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const isActive = currentPageName === item.page;
                  return (
                    <li key={item.name}>
                      <Link
                        to={createPageUrl(item.page)}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex gap-x-3 rounded-lg p-3 text-sm font-semibold",
                          isActive
                            ? "bg-slate-800 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                        {item.page === "Alerts" && unreadAlerts > 0 && (
                          <span className="ml-auto inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                            {unreadAlerts}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        <main>{children}</main>
      </div>
    </div>
  );
}