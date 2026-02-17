import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Shield, Bell, CreditCard, LogOut, User } from "lucide-react";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    emailAlerts: true,
    contractRiskAlerts: true,
    paymentNotifications: true,
    twoFactorAuth: false
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error("User not authenticated");
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-500">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-500">Email</Label>
                <p className="font-medium text-slate-900">{user?.email}</p>
              </div>
              <div>
                <Label className="text-slate-500">Full Name</Label>
                <p className="font-medium text-slate-900">{user?.full_name || "Not set"}</p>
              </div>
              <div>
                <Label className="text-slate-500">Role</Label>
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium capitalize">
                  {user?.role || "user"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Alerts</Label>
                  <p className="text-sm text-slate-500">Receive alerts via email</p>
                </div>
                <Switch
                  checked={settings.emailAlerts}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, emailAlerts: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Contract Risk Alerts</Label>
                  <p className="text-sm text-slate-500">Get notified of high-risk contracts</p>
                </div>
                <Switch
                  checked={settings.contractRiskAlerts}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, contractRiskAlerts: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Payment Notifications</Label>
                  <p className="text-sm text-slate-500">Updates on incoming payments</p>
                </div>
                <Switch
                  checked={settings.paymentNotifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, paymentNotifications: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-slate-500">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, twoFactorAuth: checked }))
                  }
                />
              </div>
              
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={handleLogout}
                variant="destructive" 
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}