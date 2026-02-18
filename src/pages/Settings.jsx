import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, User, Shield, Bell, CreditCard,
  HelpCircle, LogOut, ChevronRight, Lock,
  Smartphone, Mail, FileText, Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const handleLogout = () => {
    base44.auth.logout();
  };

  const handleDeleteAccount = () => {
    // In production, this would call a backend endpoint to delete the account
    alert("Account deletion would be processed here. Contact support@roccstar.ai to delete your account.");
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-lg mx-auto px-4 pt-safe py-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to={createPageUrl("Dashboard")}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h1>
        </div>

        {/* User Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {user?.full_name?.[0]?.toUpperCase() || "?"}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">{user?.full_name}</h3>
              <p className="text-sm text-slate-400 dark:text-slate-500">{user?.email}</p>
            </div>
            <Link 
              to={createPageUrl("TrustProfile")}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </Link>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-2 px-1">
                {section.title}
              </h2>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 divide-y divide-slate-50 dark:divide-slate-700">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-4 select-none",
                      !item.toggle && "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors",
                      index === 0 && "rounded-t-2xl",
                      index === section.items.length - 1 && "rounded-b-2xl"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-slate-400 dark:text-slate-500">{item.description}</p>
                        )}
                      </div>
                    </div>
                    {item.toggle ? (
                      <Switch defaultChecked />
                    ) : item.page ? (
                      <Link to={createPageUrl(item.page)}>
                        <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                      </Link>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="mt-6">
          <h2 className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-2 px-1">
            Danger Zone
          </h2>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl font-medium hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors border border-red-100 dark:border-red-900 select-none"
          >
            <Trash2 className="w-5 h-5" />
            Delete Account
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 p-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-100 dark:border-slate-700 select-none"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        {/* Version */}
        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-6">
          Rocc$tar AI v1.0.0
        </p>

        {/* Delete Account Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers, including contracts, split sheets, and transaction history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="select-none">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 select-none"
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}