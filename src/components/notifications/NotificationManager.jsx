import { useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function NotificationManager() {
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ["alerts", user?.email],
    queryFn: () => base44.entities.Alert.filter({ created_by: user.email, read: false }, "-created_date", 5),
    enabled: !!user?.email,
    refetchInterval: 30000, // Poll every 30 seconds
  });

  // Request browser notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Monitor for new critical alerts
  useEffect(() => {
    if (!alerts.length) return;

    const criticalAlerts = alerts.filter(a => a.severity === "critical");
    
    criticalAlerts.forEach(alert => {
      // Show browser notification if permitted
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Rocc$tar AI - Critical Alert", {
          body: alert.message,
          icon: "/logo.png",
          tag: alert.id,
          requireInteraction: true,
        });
      }

      // Show toast notification
      toast.error(alert.title, {
        description: alert.message,
        duration: 10000,
      });
    });
  }, [alerts]);

  return null;
}