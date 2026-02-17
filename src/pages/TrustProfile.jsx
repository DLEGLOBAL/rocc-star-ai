import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, FileText, DollarSign, AlertTriangle, Camera } from "lucide-react";
import TrustScoreBadge from "../components/ui/TrustScoreBadge";

export default function TrustProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    display_name: "",
    role: "artist",
    bio: ""
  });

  const queryClient = useQueryClient();

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

  const { data: trustProfile, isLoading } = useQuery({
    queryKey: ["trustProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const profiles = await base44.entities.TrustProfile.filter({ user_email: user.email });
      if (profiles[0]) {
        setProfileData({
          display_name: profiles[0].display_name,
          role: profiles[0].role || "artist",
          bio: profiles[0].bio || ""
        });
        return profiles[0];
      }
      return null;
    },
    enabled: !!user?.email
  });

  const { data: contracts = [] } = useQuery({
    queryKey: ["contracts"],
    queryFn: () => base44.entities.Contract.list(),
    initialData: []
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => base44.entities.Transaction.list(),
    initialData: []
  });

  const createOrUpdateMutation = useMutation({
    mutationFn: async (data) => {
      if (trustProfile) {
        return await base44.entities.TrustProfile.update(trustProfile.id, data);
      } else {
        const totalRevenue = transactions
          .filter(t => t.type === "income" && t.status === "completed")
          .reduce((sum, t) => sum + (t.amount || 0), 0);
        
        return await base44.entities.TrustProfile.create({
          ...data,
          user_email: user.email,
          trust_score: 75,
          payment_reliability: 80,
          contract_fairness: 85,
          dispute_count: 0,
          completed_deals: contracts.filter(c => c.status === "signed").length,
          total_volume: totalRevenue,
          verified: false
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trustProfile"] });
      setEditMode(false);
    }
  });

  const handleSave = () => {
    createOrUpdateMutation.mutate(profileData);
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const stats = [
    {
      label: "Payment Reliability",
      value: trustProfile?.payment_reliability || 0,
      icon: DollarSign,
      color: "text-emerald-500"
    },
    {
      label: "Contract Fairness",
      value: trustProfile?.contract_fairness || 0,
      icon: FileText,
      color: "text-blue-500"
    },
    {
      label: "Completed Deals",
      value: trustProfile?.completed_deals || 0,
      icon: TrendingUp,
      color: "text-violet-500"
    },
    {
      label: "Disputes",
      value: trustProfile?.dispute_count || 0,
      icon: AlertTriangle,
      color: trustProfile?.dispute_count > 0 ? "text-red-500" : "text-slate-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Trust Profile</h1>
          <p className="text-slate-500">Your reputation in the music industry</p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {profileData.display_name ? profileData.display_name[0].toUpperCase() : user.email[0].toUpperCase()}
                </div>
                {trustProfile?.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Display Name</Label>
                      <Input
                        value={profileData.display_name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, display_name: e.target.value }))}
                        placeholder="Your stage/professional name"
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Select
                        value={profileData.role}
                        onValueChange={(value) => setProfileData(prev => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="artist">Artist</SelectItem>
                          <SelectItem value="producer">Producer</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="label">Label</SelectItem>
                          <SelectItem value="publisher">Publisher</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell others about yourself..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} disabled={!profileData.display_name}>
                        Save Profile
                      </Button>
                      <Button variant="outline" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {trustProfile?.display_name || "Set up your profile"}
                        </h2>
                        <p className="text-slate-500 capitalize">{trustProfile?.role || "artist"}</p>
                      </div>
                      <TrustScoreBadge score={trustProfile?.trust_score || 0} />
                    </div>
                    <p className="text-slate-600 mb-4">
                      {trustProfile?.bio || "No bio yet. Click edit to add one."}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>{user.email}</span>
                      {trustProfile?.verified && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                    <Button onClick={() => setEditMode(true)} variant="outline" className="mt-4">
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                </div>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Volume Card */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-slate-900">
                ${(trustProfile?.total_volume || 0).toLocaleString()}
              </p>
              <p className="text-sm text-slate-500 mt-1">Total revenue processed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}