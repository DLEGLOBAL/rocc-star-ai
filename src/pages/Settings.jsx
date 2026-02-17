import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, User, Shield, Bell, CreditCard,
  HelpCircle, LogOut, ChevronRight, Lock,
  Smartphone, Mail, FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile Settings", page: "TrustProfile" },
      { icon: Shield, label: "Security", description: "2FA, password" },
      { icon: Smartphone, label: "Connected Devices" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { icon: Bell, label: "Push Notifications", toggle: true },
      { icon: Mail, label: "Email Alerts", toggle: true },
    ],
  },
  {
    title: "Payments",
    items: [
      { icon: CreditCard, label: "Payment Methods" },
      { icon: FileText, label: "Billing History" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center" },
      { icon: FileText, label: "Terms of Service" },
      { icon: Lock, label: "Privacy Policy" },
    ],
  },
];

export default function Settings() {
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const handleLogout = () => {
    base44.auth.logout();
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
          <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {user?.full_name?.[0]?.toUpperCase() || "?"}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{user?.full_name}</h3>
              <p className="text-sm text-slate-400">{user?.email}</p>
            </div>
            <Link 
              to={createPageUrl("TrustProfile")}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-medium text-slate-400 mb-2 px-1">
                {section.title}
              </h2>
              <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-4",
                      !item.toggle && "cursor-pointer hover:bg-slate-50 transition-colors",
                      index === 0 && "rounded-t-2xl",
                      index === section.items.length - 1 && "rounded-b-2xl"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-slate-400">{item.description}</p>
                        )}
                      </div>
                    </div>
                    {item.toggle ? (
                      <Switch defaultChecked />
                    ) : item.page ? (
                      <Link to={createPageUrl(item.page)}>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </Link>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-medium hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        {/* Version */}
        <p className="text-center text-xs text-slate-300 mt-6">
          Rocc$tar AI v1.0.0
        </p>
      </div>
    </div>
  );
}