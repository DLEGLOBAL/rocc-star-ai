import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, Mail, Smartphone, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    email_critical_alerts: true,
    email_signature_requests: true,
    email_payment_confirmations: true,
    browser_notifications: false,
  });

  const [browserPermission, setBrowserPermission] = useState(
    typeof window !== "undefined" && "Notification" in window 
      ? Notification.permission 
      : "denied"
  );

  useEffect(() => {
    // Load preferences from user data
    const loadPreferences = async () => {
      try {
        const user = await base44.auth.me();
        if (user.notification_preferences) {
          setPreferences({ ...preferences, ...user.notification_preferences });
        }
      } catch (error) {
        console.error("Failed to load preferences");
      }
    };
    loadPreferences();
  }, []);

  const handleToggle = async (key, value) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    try {
      await base44.auth.updateMe({
        notification_preferences: newPreferences,
      });
      toast.success("Preferences updated");
    } catch (error) {
      toast.error("Failed to update preferences");
      setPreferences(preferences);
    }
  };

  const requestBrowserPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Browser notifications not supported");
      return;
    }

    const permission = await Notification.requestPermission();
    setBrowserPermission(permission);

    if (permission === "granted") {
      handleToggle("browser_notifications", true);
      toast.success("Browser notifications enabled");
      
      // Test notification
      new Notification("Rocc$tar AI", {
        body: "You'll now receive important updates!",
        icon: "/logo.png",
      });
    } else {
      toast.error("Permission denied");
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">Email Notifications</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div>
              <p className="font-medium text-slate-900 dark:text-white text-sm">Critical Alerts</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                High-risk contracts, fraud warnings
              </p>
            </div>
            <Switch
              checked={preferences.email_critical_alerts}
              onCheckedChange={(checked) => handleToggle("email_critical_alerts", checked)}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div>
              <p className="font-medium text-slate-900 dark:text-white text-sm">Signature Requests</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Split sheet signatures needed
              </p>
            </div>
            <Switch
              checked={preferences.email_signature_requests}
              onCheckedChange={(checked) => handleToggle("email_signature_requests", checked)}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div>
              <p className="font-medium text-slate-900 dark:text-white text-sm">Payment Confirmations</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transaction updates
              </p>
            </div>
            <Switch
              checked={preferences.email_payment_confirmations}
              onCheckedChange={(checked) => handleToggle("email_payment_confirmations", checked)}
            />
          </div>
        </div>
      </div>

      {/* Browser Notifications */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">Browser Notifications</h3>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-medium text-slate-900 dark:text-white text-sm">
                Desktop Notifications
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Get notified even when the app is in the background
              </p>
            </div>
            <div className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              browserPermission === "granted" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
              browserPermission === "denied" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
              "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            )}>
              {browserPermission === "granted" ? "Enabled" :
               browserPermission === "denied" ? "Blocked" : "Not Set"}
            </div>
          </div>
          
          {browserPermission !== "granted" && (
            <Button
              onClick={requestBrowserPermission}
              variant="outline"
              className="w-full"
              disabled={browserPermission === "denied"}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              {browserPermission === "denied" 
                ? "Blocked - Enable in Browser Settings" 
                : "Enable Browser Notifications"}
            </Button>
          )}
          
          {browserPermission === "granted" && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Browser notifications active</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}