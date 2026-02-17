import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  ArrowLeft, Shield, CheckCircle, Star, 
  FileText, DollarSign, Users, Edit2,
  Loader2, Camera, BadgeCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import TrustScoreBadge from "../components/ui/TrustScoreBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = ["artist", "producer", "manager", "label", "publisher", "other"];

export default function TrustProfile() {
  const queryClient = useQueryClient();
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const { data: trustProfiles = [], isLoading } = useQuery({
    queryKey: ["trustProfile", user?.email],
    queryFn: () => base44.entities.TrustProfile.filter({ user_email: user?.email }),
    enabled: !!user?.email,
  });

  const { data: contracts = [] } = useQuery({
    queryKey: ["userContracts"],
    queryFn: () => base44.entities.Contract.list("-created_date", 100),
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: () => base44.entities.Transaction.filter({ status: "completed" }, "-created_date", 100),
  });

  const profile = trustProfiles[0];

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.TrustProfile.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trustProfile"] });
      setShowEdit(false);
      toast.success("Profile created!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.TrustProfile.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trustProfile"] });
      setShowEdit(false);
      toast.success("Profile updated!");
    },
  });

  useEffect(() => {
    if (profile) {
      setEditData({
        display_name: profile.display_name || user?.full_name || "",
        role: profile.role || "artist",
        bio: profile.bio || "",
      });
    } else if (user) {
      setEditData({
        display_name: user.full_name || "",
        role: "artist",
        bio: "",
      });
    }
  }, [profile, user]);

  const handleSave = () => {
    const data = {
      ...editData,
      user_email: user.email,
      trust_score: profile?.trust_score || 75,
      payment_reliability: profile?.payment_reliability || 80,
      contract_fairness: profile?.contract_fairness || 70,
    };

    if (profile) {
      updateMutation.mutate({ id: profile.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const totalVolume = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const signedContracts = contracts.filter(c => c.status === "signed").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to={createPageUrl("Dashboard")}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <h1 className="text-xl font-bold text-slate-900">Trust Profile</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEdit(true)}
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
          
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {(profile?.display_name || user?.full_name)?.[0]?.toUpperCase() || "?"}
                  </span>
                </div>
                {profile?.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <BadgeCheck className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">
                  {profile?.display_name || user?.full_name || "Your Name"}
                </h2>
                <p className="text-slate-400 capitalize">
                  {profile?.role || "Artist"}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Trust Score</p>
                  <p className="text-4xl font-bold text-white mt-1">
                    {profile?.trust_score || 75}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-emerald-400 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile?.bio && (
          <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6">
            <h3 className="font-semibold text-slate-900 mb-2">About</h3>
            <p className="text-slate-600 text-sm">{profile.bio}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ${totalVolume.toLocaleString()}
            </p>
            <p className="text-sm text-slate-400">Total Volume</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-violet-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{signedContracts}</p>
            <p className="text-sm text-slate-400">Completed Deals</p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Score Breakdown</h3>
          <div className="space-y-4">
            <ScoreBar 
              label="Payment Reliability" 
              score={profile?.payment_reliability || 80} 
              color="emerald"
            />
            <ScoreBar 
              label="Contract Fairness" 
              score={profile?.contract_fairness || 70} 
              color="blue"
            />
            <ScoreBar 
              label="Response Time" 
              score={85} 
              color="violet"
            />
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={showEdit} onOpenChange={setShowEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Display Name
                </label>
                <Input
                  value={editData.display_name || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, display_name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Role
                </label>
                <Select
                  value={editData.role || "artist"}
                  onValueChange={(value) => setEditData(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map(role => (
                      <SelectItem key={role} value={role} className="capitalize">
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Bio
                </label>
                <Textarea
                  value={editData.bio || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell others about yourself..."
                  rows={3}
                />
              </div>
              <Button
                onClick={handleSave}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="w-full bg-violet-600 hover:bg-violet-700"
              >
                {(createMutation.isPending || updateMutation.isPending) ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function ScoreBar({ label, score, color }) {
  const colors = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    violet: "bg-violet-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm font-semibold text-slate-900">{score}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all", colors[color])}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}