import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Shield, FileText, Users, Wallet, TrendingUp,
  Sparkles, CheckCircle, AlertTriangle, Lock,
  Eye, Scale, Award, Zap, ArrowRight, Star,
  FileCheck, DollarSign, UserCheck, Bot, Bell,
  LineChart, Music, Handshake, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    icon: FileText,
    title: "AI Contract Analyzer",
    description: "Upload any music contract and get instant AI-powered analysis in plain English. We flag unfair terms and suggest fairer alternatives.",
    highlights: ["Instant risk scoring (0–100)", "Plain English summaries", "Industry standard comparisons", "Clause-by-clause breakdown", "Fairer alternative suggestions", "PDF & Word support"],
    accent: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/30",
    icon_bg: "bg-violet-500/20 text-violet-300 border border-violet-500/30"
  },
  {
    icon: Users,
    title: "Smart Split Sheets",
    description: "Create legally binding split sheets with real-time collaboration, digital signatures, and complete version history.",
    highlights: ["Real-time collaboration", "Digital signature collection", "Version history tracking", "Automatic % validation", "Comment threads", "ISRC integration"],
    accent: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/30",
    icon_bg: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
  },
  {
    icon: LineChart,
    title: "Automated Royalty Tracking",
    description: "Track song performance and automatically calculate royalties for each collaborator. Full transparency on every dollar earned.",
    highlights: ["Automatic split calculations", "Platform-by-platform breakdown", "Real-time royalty reports", "Payment status tracking", "Historical data", "Export for accounting"],
    accent: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/30",
    icon_bg: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
  },
  {
    icon: Shield,
    title: "Trust Score System",
    description: "Build your reputation with verifiable trust scores based on payment reliability, contract fairness, and completed deals.",
    highlights: ["Payment reliability tracking", "Contract fairness ratings", "Completed deal history", "Dispute tracking", "Public profile verification", "Industry reputation"],
    accent: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/30",
    icon_bg: "bg-amber-500/20 text-amber-300 border border-amber-500/30"
  },
  {
    icon: Bot,
    title: "AI Deal Advisor",
    description: "Get instant, personalized advice on any music industry scenario. Your 24/7 AI music lawyer available on demand.",
    highlights: ["24/7 available", "Contract-specific advice", "Real-world scenario analysis", "Negotiation strategies", "Risk assessment", "Plain English explanations"],
    accent: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/30",
    icon_bg: "bg-pink-500/20 text-pink-300 border border-pink-500/30"
  },
  {
    icon: Wallet,
    title: "Transparent Wallet",
    description: "Track all your earnings, payouts, and escrow payments in one place. Full transaction history with source tracking.",
    highlights: ["Real-time balance tracking", "Income source breakdown", "Payout management", "Escrow protection", "Full transaction history", "Multi-currency support"],
    accent: "from-indigo-500 to-blue-600",
    glow: "shadow-indigo-500/30",
    icon_bg: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
  },
  {
    icon: Bell,
    title: "Intelligent Alerts",
    description: "Never miss critical deadlines or warnings. Instant notifications about contract risks, payments, and potential fraud.",
    highlights: ["Real-time risk warnings", "Payment reminders", "Signature request tracking", "Fraud detection alerts", "Customizable notifications", "Priority sorting"],
    accent: "from-red-500 to-pink-600",
    glow: "shadow-red-500/30",
    icon_bg: "bg-red-500/20 text-red-300 border border-red-500/30"
  }
];

const stats = [
  { value: "98%", label: "Unfair terms detected", icon: Eye },
  { value: "$2M+", label: "Protected for artists", icon: Shield },
  { value: "15min", label: "Avg. analysis time", icon: Zap },
  { value: "500+", label: "Artists protected", icon: UserCheck }
];

const howItWorks = [
  { step: "01", title: "Upload Your Contract", description: "Drag & drop any music contract — recording, publishing, sync, collaboration, and more.", icon: FileText, color: "violet" },
  { step: "02", title: "AI Analysis in Seconds", description: "Our AI analyzes every clause, compares to industry standards, and surfaces every risk and red flag.", icon: Sparkles, color: "cyan" },
  { step: "03", title: "Get Actionable Insights", description: "Receive a plain English breakdown with risk scores and specific suggestions for fairer terms.", icon: CheckCircle, color: "emerald" },
  { step: "04", title: "Protect Your Rights", description: "Create split sheets, track royalties, build your trust score, and own your entire career.", icon: Shield, color: "amber" }
];

const testimonials = [
  { quote: "RAP saved me from signing a terrible 360 deal. The AI caught clauses my lawyer missed.", author: "Independent Artist", role: "Hip-Hop / R&B", rating: 5 },
  { quote: "Finally, I understand what I'm signing. The plain English summaries are game-changing.", author: "Marcus T.", role: "Producer", rating: 5 },
  { quote: "The split sheet feature eliminated all the confusion with my collaborators. Everyone's on the same page.", author: "Aria K.", role: "Songwriter", rating: 5 }
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#0a0818" }}>

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden min-h-screen flex flex-col">
        {/* layered background */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d0b2e 0%, #150d3a 40%, #1a0e3d 70%, #0d1530 100%)" }} />
        <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(ellipse at ${mousePosition.x}px ${mousePosition.y}px, rgba(139,92,246,0.2), transparent 55%)` }} />
        {/* orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 animate-pulse" style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-15 animate-pulse delay-1000" style={{ background: "radial-gradient(circle, #2563eb, transparent 70%)", transform: "translate(-30%, 30%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #9333ea, transparent 60%)" }} />
        {/* grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* NAV */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-black text-white tracking-wide">RAP</p>
              <p className="text-[10px] text-violet-400 font-semibold uppercase tracking-widest">Real Artist Protection</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to={createPageUrl("AIAdvisor")}>
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 text-sm hidden sm:inline-flex">AI Advisor</Button>
            </Link>
            <Link to={createPageUrl("Dashboard")}>
              <Button className="text-sm font-semibold px-5 h-9 rounded-xl border border-violet-500/50 bg-violet-600/20 hover:bg-violet-600/40 text-white backdrop-blur">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-sm font-medium text-violet-200 border border-violet-500/40"
            style={{ background: "rgba(124,58,237,0.15)", backdropFilter: "blur(12px)" }}
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            AI-Powered Music Industry Protection
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6 max-w-5xl"
          >
            <span className="text-white">Never Sign a </span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Bad Deal</span>
            <span className="text-white"> Again</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            The first AI-powered platform that analyzes contracts, tracks royalties, protects splits,
            and builds your trust score — designed to keep music creators in full control.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="h-14 px-10 text-base font-bold rounded-2xl text-white group"
                style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)", boxShadow: "0 0 40px rgba(124,58,237,0.5)" }}>
                Get Protected Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl("ContractAnalyzer")}>
              <Button size="lg" variant="outline" className="h-14 px-10 text-base font-semibold rounded-2xl border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur bg-transparent">
                <Play className="w-5 h-5 mr-2 fill-white" />
                Analyze a Contract Free
              </Button>
            </Link>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="text-sm text-violet-400"
          >
            ✓ No credit card required &nbsp;•&nbsp; ✓ Free AI analysis &nbsp;•&nbsp; ✓ Full platform access
          </motion.p>

          {/* STATS */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-16 w-full max-w-4xl"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.75 + idx * 0.1 }}
                className="rounded-2xl p-5 text-center border border-white/10 hover:border-violet-500/40 transition-all hover:scale-105 cursor-default"
                style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)" }}
              >
                <stat.icon className="w-7 h-7 text-violet-400 mx-auto mb-2" />
                <p className="text-3xl sm:text-4xl font-black text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-violet-400 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* ─── PROBLEM SECTION ─────────────────────────────────────── */}
      <div className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0818 0%, #12091f 50%, #0a0818 100%)" }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(239,68,68,0.12), transparent 50%), radial-gradient(circle at 80% 50%, rgba(251,146,60,0.08), transparent 50%)" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border border-red-500/30 text-red-300 text-sm font-semibold"
            style={{ background: "rgba(239,68,68,0.1)" }}
          >
            <AlertTriangle className="w-4 h-4" /> The Problem No One Talks About
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5"
          >
            Artists Lose <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Millions</span> to Bad Contracts Every Year
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-14"
          >
            Complex legal language, hidden clauses, unfair splits, zero transparency.
            The music industry has been taking advantage of creators for decades. Until now.
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { stat: "73%", text: "of artists don't fully understand their contracts", color: "from-red-400 to-rose-400" },
              { stat: "$4.5B", text: "lost annually to unfair contract terms globally", color: "from-orange-400 to-amber-400" },
              { stat: "89%", text: "of independent artists lack any legal representation", color: "from-red-400 to-orange-400" }
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="rounded-2xl p-8 border border-white/10 hover:border-red-500/30 transition-all"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
              >
                <p className={cn("text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent mb-3", item.color)}>{item.stat}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FEATURES SECTION ────────────────────────────────────── */}
      <div className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0818 0%, #0d0b25 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.2), transparent 60%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5 text-sm font-semibold text-violet-300 border border-violet-500/30"
              style={{ background: "rgba(124,58,237,0.12)" }}
            >
              <Shield className="w-4 h-4" /> Complete Protection Suite
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            >
              Everything You Need to Stay Protected
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-2xl mx-auto"
            >
              Seven powerful tools, one unified platform — built for music creators.
            </motion.p>
          </div>

          {/* Feature cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}
                className={cn(
                  "group rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-default",
                  idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                )}
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.icon_bg)}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{feature.description}</p>
                <ul className="space-y-1.5">
                  {feature.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── HOW IT WORKS ────────────────────────────────────────── */}
      <div className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0e3d 0%, #0d1a3d 50%, #1a0e3d 100%)" }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 0% 100%, rgba(124,58,237,0.2), transparent 50%), radial-gradient(circle at 100% 0%, rgba(37,99,235,0.15), transparent 50%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5 text-sm font-semibold text-white border border-white/20"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
            >
              <Zap className="w-4 h-4 text-amber-400" /> Simple 4-Step Process
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">How RAP Protects You</h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">From upload to full protection in minutes. No legal degree required.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.12 }}
                className="relative group rounded-2xl p-7 border border-white/10 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)" }}
              >
                <div className="text-5xl font-black mb-4 bg-gradient-to-br from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{item.step}</div>
                <item.icon className="w-8 h-8 text-violet-300 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                {idx < howItWorks.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500/60 z-20" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to={createPageUrl("ContractAnalyzer")}>
              <Button size="lg" className="h-14 px-10 text-base font-bold rounded-2xl text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)", boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}>
                Start Analyzing Contracts Now <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ─── WHY RAP / BENEFITS ──────────────────────────────────── */}
      <div className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0818 0%, #0f0c29 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 100% 50%, rgba(124,58,237,0.2), transparent 50%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* left */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold text-violet-300 border border-violet-500/30" style={{ background: "rgba(124,58,237,0.12)" }}>
                <Award className="w-4 h-4" /> Why Choose RAP
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Built by Artists,<br />
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">For Artists</span>
              </h2>
              <div className="space-y-5">
                {[
                  { icon: Lock, title: "Industry-First AI Analysis", desc: "Trained on thousands of real music contracts. We catch what humans miss and explain it in plain English — no legal jargon.", color: "violet" },
                  { icon: Scale, title: "Created by Industry Veterans", desc: "Built by artists burned by bad deals. RAP exists because we've lived the pain of unfair contracts and missing royalties.", color: "cyan" },
                  { icon: Eye, title: "Radical Transparency, Always", desc: "Every dollar tracked. Every split documented. Every clause explained. You see everything, control everything, own everything.", color: "emerald" }
                ].map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.12 }}
                    className="flex gap-4 p-5 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-all group"
                    style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-violet-500/20 border border-violet-500/30 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-violet-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* right: package card */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative rounded-3xl p-8 border border-violet-500/30 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a1040 0%, #130d35 50%, #0d1530 100%)" }}
            >
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-15" style={{ background: "radial-gradient(circle, #2563eb, transparent)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-white">Complete Protection</p>
                    <p className="text-sm text-violet-400">Everything in one platform</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 mb-8">
                  {[
                    { text: "Unlimited AI contract analysis", icon: FileText },
                    { text: "Smart split sheet creation & tracking", icon: Users },
                    { text: "Automated royalty calculations", icon: DollarSign },
                    { text: "24/7 AI deal advisor", icon: Bot },
                    { text: "Trust score & reputation building", icon: Award },
                    { text: "Real-time collaboration", icon: Handshake },
                    { text: "Complete version history", icon: FileCheck },
                    { text: "Instant risk alerts", icon: Bell },
                    { text: "Transparent payment tracking", icon: Wallet },
                    { text: "Industry standard comparisons", icon: TrendingUp }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 hover:border-violet-500/30 transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <item.icon className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      <span className="text-sm text-slate-200 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Link to={createPageUrl("Dashboard")}>
                  <Button className="w-full h-13 text-base font-bold rounded-2xl text-white"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)", boxShadow: "0 0 25px rgba(124,58,237,0.4)" }}>
                    Get Full Access Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <p className="text-center text-violet-400 text-xs mt-3">✓ No credit card &nbsp;•&nbsp; ✓ Instant access &nbsp;•&nbsp; ✓ Cancel anytime</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── TESTIMONIALS ────────────────────────────────────────── */}
      <div className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0c29 0%, #0a0818 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, rgba(251,191,36,0.1), transparent 50%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5 text-sm font-semibold text-amber-300 border border-amber-500/30" style={{ background: "rgba(251,191,36,0.08)" }}>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> Artist Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Trusted by Creators Worldwide</h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">Real artists, real protection, real results.</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="rounded-2xl p-7 border border-white/10 hover:border-amber-500/30 transition-all hover:-translate-y-1 duration-300"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-200 leading-relaxed mb-6 text-base font-medium">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}>
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.author}</p>
                    <p className="text-xs text-violet-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FINAL CTA ───────────────────────────────────────────── */}
      <div className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0e3d 0%, #12091f 50%, #0d1530 100%)" }}>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 animate-pulse"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent 60%)" }} />
        </div>
        {/* decorative ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-violet-500/10 opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-violet-500/10 opacity-50" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 text-sm font-semibold text-white border border-white/20" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
              <Shield className="w-4 h-4 text-violet-400" /> Start Your Protection Today
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Take Control of<br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Your Music Career?</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of artists who refuse to sign bad deals. Get instant AI analysis, transparent split tracking, and complete career protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to={createPageUrl("Dashboard")}>
                <Button size="lg" className="h-14 px-10 text-base font-bold rounded-2xl text-white group"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)", boxShadow: "0 0 50px rgba(124,58,237,0.5)" }}>
                  Get Full Access Now <Shield className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl("ContractAnalyzer")}>
                <Button size="lg" variant="outline" className="h-14 px-10 text-base font-semibold rounded-2xl border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur bg-transparent">
                  Analyze First Contract Free <FileText className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              {["No credit card required", "Instant AI analysis", "Full platform access", "Cancel anytime"].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <div className="border-t py-14" style={{ background: "#060411", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-black text-xl text-white">RAP</p>
                  <p className="text-xs text-violet-400 uppercase tracking-widest">Real Artist Protection</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-5">
                The first AI-powered platform built to protect music creators from unfair deals, track royalties, and build verifiable trust.
              </p>
              <Link to={createPageUrl("Dashboard")}>
                <Button className="h-9 px-5 text-sm rounded-xl text-white font-semibold" style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}>
                  Get Started
                </Button>
              </Link>
            </div>

            <div>
              <p className="font-bold text-white mb-4 text-sm">Platform</p>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {[
                  { label: "Contract Analyzer", page: "ContractAnalyzer", icon: FileText },
                  { label: "Split Sheets", page: "SplitSheetBuilder", icon: Users },
                  { label: "Royalties", page: "Royalties", icon: DollarSign },
                  { label: "AI Advisor", page: "AIAdvisor", icon: Bot }
                ].map(item => (
                  <li key={item.page}>
                    <Link to={createPageUrl(item.page)} className="flex items-center gap-2 hover:text-violet-400 transition-colors">
                      <item.icon className="w-3.5 h-3.5" /> {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-4 text-sm">Company</p>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {[
                  { label: "About Us", page: "AboutUs" },
                  { label: "Dashboard", page: "Dashboard" },
                  { label: "Trust Score", page: "TrustProfile" },
                  { label: "Settings", page: "Settings" }
                ].map(item => (
                  <li key={item.page}>
                    <Link to={createPageUrl(item.page)} className="hover:text-violet-400 transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p>© 2026 RAP – Real Artist Protection. Empowering music creators worldwide.</p>
            <div className="flex items-center gap-4">
              <span>Built with ❤️ for Artists</span>
              <span>•</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}