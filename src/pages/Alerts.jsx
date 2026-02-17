import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertTriangle, FileWarning, CreditCard, PenTool, AlertOctagon, Bell, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const alertIcons = {
  fraud_warning: AlertOctagon,
  contract_risk: FileWarning,
  payment_due: CreditCard,
  signature_needed: PenTool,
  dispute: AlertTriangle,
  system: Bell
};

const severityStyles = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
    iconColor: "text-blue-600"
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
    iconColor: "text-amber-600"
  },
  critical: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
    iconColor: "text-red-600"
  }
};

export default function Alerts() {
  const queryClient = useQueryClient();

  const { data: alerts = [] } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => base44.entities.Alert.list("-created_date", 100),
    initialData: []
  });

  const markAsReadMutation = useMutation({
    mutationFn: (alertId) => base44.entities.Alert.update(alertId, { read: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    }
  });

  const unreadAlerts = alerts.filter(a => !a.read);
  const readAlerts = alerts.filter(a => a.read);
  const criticalAlerts = alerts.filter(a => a.severity === "critical");

  const AlertItem = ({ alert }) => {
    const Icon = alertIcons[alert.type] || Bell;
    const styles = severityStyles[alert.severity] || severityStyles.info;

    return (
      <Card className={cn("border-l-4", styles.border)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", styles.bg)}>
              <Icon className={cn("w-5 h-5", styles.iconColor)} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className={cn("font-semibold text-sm", styles.text)}>{alert.title}</h3>
                <span className="text-xs text-slate-400 flex-shrink-0">
                  {format(new Date(alert.created_date), "MMM d, h:mm a")}
                </span>
              </div>
              
              <p className="text-sm text-slate-600 mb-3">{alert.message}</p>
              
              <div className="flex items-center gap-2">
                {!alert.read && (
                  <Button
                    onClick={() => markAsReadMutation.mutate(alert.id)}
                    size="sm"
                    variant="outline"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Mark as Read
                  </Button>
                )}
                {alert.action_url && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={alert.action_url}>View Details</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Security Alerts</h1>
          <p className="text-slate-500">Stay informed about risks and important updates</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Unread Alerts</p>
                  <p className="text-2xl font-bold text-slate-900">{unreadAlerts.length}</p>
                </div>
                <Bell className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Critical</p>
                  <p className="text-2xl font-bold text-red-600">{criticalAlerts.length}</p>
                </div>
                <AlertOctagon className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Alerts</p>
                  <p className="text-2xl font-bold text-slate-900">{alerts.length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <Tabs defaultValue="unread">
          <TabsList className="mb-4">
            <TabsTrigger value="unread">
              Unread ({unreadAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="critical">
              Critical ({criticalAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All Alerts ({alerts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="unread" className="space-y-3">
            {unreadAlerts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-slate-500">All caught up! No unread alerts.</p>
                </CardContent>
              </Card>
            ) : (
              unreadAlerts.map(alert => <AlertItem key={alert.id} alert={alert} />)
            )}
          </TabsContent>

          <TabsContent value="critical" className="space-y-3">
            {criticalAlerts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-slate-500">No critical alerts.</p>
                </CardContent>
              </Card>
            ) : (
              criticalAlerts.map(alert => <AlertItem key={alert.id} alert={alert} />)
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-3">
            {alerts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No alerts yet.</p>
                </CardContent>
              </Card>
            ) : (
              alerts.map(alert => <AlertItem key={alert.id} alert={alert} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}