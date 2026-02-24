import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Shield, FileText, Users, Wallet, TrendingUp,
  Sparkles, CheckCircle, AlertTriangle, Lock,
  Eye, Scale, Award, Zap, ArrowRight, Star,
  FileCheck, DollarSign, UserCheck, Bot, Bell,
  LineChart, ChevronRight, Music, Handshake, Play } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
{
  icon: FileText,
  title: "AI Contract Analyzer",
  description: "Upload any music contract and get instant AI-powered analysis in plain English. We compare against industry standards, flag unfair terms, and suggest fairer alternatives.",
  highlights: [
  "Instant risk scoring (0-100 scale)",
  "Plain English contract summaries",
  "Industry standard comparisons",
  "Problematic clause identification",
  "Fairer alternative suggestions",
  "Multi-format support (PDF, Word)"],

  gradient: "from-violet-500 to-purple-600",
  icon_bg: "bg-violet-100 text-violet-600"
},
{
  icon: Users,
  title: "Smart Split Sheets",
  description: "Create legally binding split sheets with real-time collaboration. Track ownership percentages, get all parties to sign digitally, and maintain complete version history.",
  highlights: [
  "Real-time multi-user collaboration",
  "Digital signature collection",
  "Complete version history tracking",
  "Automatic percentage validation",
  "Comment & discussion threads",
  "ISRC code integration"],

  gradient: "from-blue-500 to-cyan-600",
  icon_bg: "bg-blue-100 text-blue-600"
},
{
  icon: LineChart,
  title: "Automated Royalty Tracking",
  description: "Track song performance and automatically calculate royalties for each collaborator based on your split sheets. Full transparency on every dollar earned.",
  highlights: [
  "Automatic split calculations",
  "Platform-by-platform breakdown",
  "Real-time royalty reports",
  "Payment status tracking",
  "Historical performance data",
  "Export reports for accounting"],

  gradient: "from-emerald-500 to-teal-600",
  icon_bg: "bg-emerald-100 text-emerald-600"
},
{
  icon: Shield,
  title: "Trust Score System",
  description: "Build your reputation with verifiable trust scores based on payment reliability, contract fairness, and completed deals. See who you're working with before you sign.",
  highlights: [
  "Payment reliability tracking",
  "Contract fairness ratings",
  "Completed deal history",
  "Dispute tracking",
  "Public profile verification",
  "Industry reputation building"],

  gradient: "from-amber-500 to-orange-600",
  icon_bg: "bg-amber-100 text-amber-600"
},
{
  icon: Bot,
  title: "AI Deal Advisor",
  description: "Get instant, personalized advice on any music industry scenario. Ask questions about contracts, deals, royalties, or any legal matter – get expert-level guidance in seconds.",
  highlights: [
  "24/7 AI music lawyer available",
  "Contract-specific advice",
  "Real-world scenario analysis",
  "Negotiation strategies",
  "Risk assessment on demand",
  "Plain English explanations"],

  gradient: "from-pink-500 to-rose-600",
  icon_bg: "bg-pink-100 text-pink-600"
},
{
  icon: Wallet,
  title: "Transparent Wallet",
  description: "Track all your earnings, payouts, and escrow payments in one place. Full transaction history with source tracking and status updates for every dollar.",
  highlights: [
  "Real-time balance tracking",
  "Income source breakdown",
  "Payout management",
  "Escrow protection",
  "Transaction history",
  "Multi-currency support"],

  gradient: "from-indigo-500 to-blue-600",
  icon_bg: "bg-indigo-100 text-indigo-600"
},
{
  icon: Bell,
  title: "Intelligent Alerts",
  description: "Never miss critical deadlines or warnings. Get instant notifications about contract risks, payment due dates, signature requests, and potential fraud.",
  highlights: [
  "Real-time risk warnings",
  "Payment due reminders",
  "Signature request tracking",
  "Fraud detection alerts",
  "Customizable notifications",
  "Priority-based sorting"],

  gradient: "from-red-500 to-pink-600",
  icon_bg: "bg-red-100 text-red-600"
}];


const stats = [
{ value: "98%", label: "Unfair terms detected", icon: Eye },
{ value: "$2M+", label: "Protected for artists", icon: Shield },
{ value: "15min", label: "Average analysis time", icon: Zap },
{ value: "500+", label: "Artists protected", icon: UserCheck }];


const howItWorks = [
{
  step: "1",
  title: "Upload Your Contract",
  description: "Simply drag and drop any music contract – recording deals, publishing agreements, sync licenses, or collaboration contracts.",
  icon: FileText
},
{
  step: "2",
  title: "AI Analysis in Seconds",
  description: "Our AI lawyer analyzes every clause, compares against industry standards, and identifies risks, unfair terms, and red flags.",
  icon: Sparkles
},
{
  step: "3",
  title: "Get Actionable Insights",
  description: "Receive a complete breakdown in plain English with risk scores, warnings, and specific suggestions for fairer terms to negotiate.",
  icon: CheckCircle
},
{
  step: "4",
  title: "Protect Your Rights",
  description: "Create split sheets, track royalties, build your trust score, and manage all your deals in one protected platform.",
  icon: Shield
}];


const testimonials = [
{
  quote: "RAP saved me from signing a terrible 360 deal. The AI caught clauses my lawyer missed.",
  author: "Independent Artist",
  rating: 5
},
{
  quote: "Finally, I understand what I'm signing. The plain English summaries are game-changing.",
  author: "Producer",
  rating: 5
},
{
  quote: "The split sheet feature eliminated all the confusion with my collaborators. Everyone's on the same page.",
  author: "Songwriter",
  rating: 5
}];


export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-slate-950 to-blue-950" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 50%)`
          }} />

        <div className="absolute top-20 right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-20 z-10">
          {/* Navigation Bar */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-20">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/50">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  RAP
                </h1>
                <p className="text-xs text-violet-300 font-medium">Real Artist Protection</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to={createPageUrl("AIAdvisor")}>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  AI Advisor
                </Button>
              </Link>
              <Link to={createPageUrl("Dashboard")}>
                <Button className="bg-white/10 backdrop-blur text-white hover:bg-white/20 border border-white/20">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.nav>

          {/* Hero Content */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-violet-500/20 backdrop-blur border border-violet-400/30 rounded-full px-4 py-2 mb-8">

              <Sparkles className="w-4 h-4 text-violet-300" />
              <span className="text-sm text-violet-200 font-medium">AI-Powered Music Industry Protection</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]">

              <span className="text-white">Never Sign a </span>
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Bad Deal
              </span>
              <span className="text-white"> Again</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">

              The first AI-powered platform that analyzes contracts, tracks royalties, 
              protects splits, and builds your trust score — all designed to keep music creators 
              in control of their career.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

              <Link to={createPageUrl("Dashboard")}>
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-10 h-16 text-lg shadow-2xl shadow-violet-600/50 group">
                  Get Protected Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl("ContractAnalyzer")}>
                <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur">
                  <Play className="w-5 h-5 mr-2" />
                  Analyze a Contract
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-violet-300 text-sm">

              ✓ No credit card required  •  ✓ Free AI analysis  •  ✓ Full platform access
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">

            {stats.map((stat, idx) =>
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all hover:scale-105">

                <stat.icon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-300">{stat.label}</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">

          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-white rounded-full" />

          </div>
        </motion.div>
      </div>

      {/* Problem Statement */}
      <div className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur border border-red-400/30 rounded-full px-4 py-2 mb-8">

            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-200 font-medium">The Problem</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6">

            Artists Lose Millions to Bad Contracts Every Year
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">

            Complex legal language, hidden clauses, unfair splits, and zero transparency. 
            The music industry has been taking advantage of creators for decades. Until now.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
            { stat: "73%", text: "of artists don't fully understand their contracts" },
            { stat: "$4.5B", text: "lost annually to unfair contract terms" },
            { stat: "89%", text: "of independent artists lack legal representation" }].
            map((item, idx) =>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">

                <p className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-3">
                  {item.stat}
                </p>
                <p className="text-slate-300">{item.text}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-violet-100 rounded-full px-4 py-2 mb-6">

              <Shield className="w-4 h-4 text-violet-600" />
              <span className="text-sm text-violet-700 font-semibold">Complete Protection Suite</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">

              Everything You Need to Stay Protected
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-slate-600 max-w-3xl mx-auto">

              Seven powerful tools, one platform. From AI contract analysis to automated royalty 
              tracking, we've built everything you need to take control of your music career.
            </motion.p>
          </div>

          <div className="space-y-12">
            {features.map((feature, idx) =>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "bg-gradient-to-br rounded-3xl p-8 md:p-12 border shadow-2xl hover:shadow-3xl transition-all group",
                idx % 2 === 0 ?
                "from-slate-50 via-white to-slate-50 border-slate-200" :
                "from-white via-slate-50 to-white border-slate-200"
              )}>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}>

                    <div className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl",
                    feature.icon_bg
                  )}>
                      <feature.icon className="w-10 h-10" />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-3xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                        {feature.title}
                      </h3>
                      <span className="text-sm font-semibold text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
                        #{idx + 1}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {feature.highlights.map((highlight, hIdx) =>
                    <motion.div
                      key={hIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: hIdx * 0.05 }}
                      className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 group-hover:border-violet-200 transition-colors">

                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{highlight}</span>
                        </motion.div>
                    )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-32 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20">

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Simple 4-Step Process</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">How RAP Protects You</h2>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto">
              From upload to full protection in minutes. No legal degree required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {howItWorks.map((item, idx) =>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative">

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 h-full border border-white/20 hover:bg-white/15 transition-all group">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center text-3xl font-black mb-6 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <item.icon className="w-10 h-10 text-violet-200 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-violet-100 leading-relaxed text-lg">{item.description}</p>
                </div>
                
                {idx < howItWorks.length - 1 &&
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-white/60" />
                  </div>
              }
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16">

            <Link to={createPageUrl("ContractAnalyzer")}>
              <Button size="lg" className="bg-white text-violet-600 hover:bg-slate-100 px-10 h-16 text-lg font-semibold shadow-2xl">
                Start Analyzing Contracts Now
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Why RAP Section */}
      <div className="py-32 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <div className="inline-flex items-center gap-2 bg-violet-100 rounded-full px-4 py-2 mb-6">
                <Award className="w-4 h-4 text-violet-600" />
                <span className="text-sm text-violet-700 font-semibold">Why Choose RAP</span>
              </div>
              
              <h2 className="text-5xl font-bold text-slate-900 mb-8">
                Built by Artists,<br />For Artists
              </h2>
              <div className="space-y-8">
                {[
                {
                  icon: Lock,
                  color: "violet",
                  title: "Industry-First AI Analysis",
                  description: "Our AI is trained on thousands of music contracts and real industry data. We compare every clause against industry standards and catch unfair terms that even experienced lawyers miss. Get instant analysis in plain English, not legal jargon."
                },
                {
                  icon: Scale,
                  color: "blue",
                  title: "Created by Real Music Industry Veterans",
                  description: "Built by artists who've been burned by bad deals. We've experienced the pain of unfair contracts, missing royalties, and shady business practices. RAP exists to make sure no artist goes through what we did."
                },
                {
                  icon: Eye,
                  color: "emerald",
                  title: "Radical Transparency, Always",
                  description: "Every dollar tracked. Every split documented. Every clause explained. Complete version history. Full audit trails. No hidden fees. No mystery calculations. You see everything, control everything, own everything."
                }].
                map((item, idx) =>
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex gap-5 p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all group">

                    <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform",
                    `bg-${item.color}-100`
                  )}>
                      <item.icon className={cn("w-7 h-7", `text-${item.color}-600`)} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 via-violet-900 to-purple-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">

              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold">Complete Protection Package</h3>
                </div>
              <ul className="space-y-4 mb-8">
                {[
                  { text: "Unlimited AI contract analysis", icon: FileText },
                  { text: "Smart split sheet creation & tracking", icon: Users },
                  { text: "Automated royalty calculations", icon: DollarSign },
                  { text: "24/7 AI deal advisor", icon: Bot },
                  { text: "Trust score & reputation building", icon: Award },
                  { text: "Real-time multi-user collaboration", icon: Handshake },
                  { text: "Complete version history", icon: FileCheck },
                  { text: "Instant risk alerts", icon: Bell },
                  { text: "Transparent payment tracking", icon: Wallet },
                  { text: "Industry standard comparisons", icon: TrendingUp }].
                  map((item, idx) =>
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 p-3 bg-white/10 backdrop-blur rounded-xl border border-white/20">

                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </motion.li>
                  )}
              </ul>
              
              <Link to={createPageUrl("Dashboard")}>
                <Button className="w-full bg-white text-violet-600 hover:bg-slate-100 h-14 text-lg font-bold group shadow-xl">
                  Get Full Access Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <p className="text-center text-violet-200 text-sm mt-4">
                ✓ No credit card  •  ✓ Instant access  •  ✓ Cancel anytime
              </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20">

            <div className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span className="text-sm text-amber-700 font-semibold">Artist Testimonials</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Trusted by Creators Worldwide
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real artists, real protection, real results. See how RAP is changing careers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) =>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-200 hover:border-violet-300 hover:shadow-2xl transition-all">

                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) =>
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                )}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed text-lg font-medium">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">Verified RAP User</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-32 bg-gradient-to-br from-slate-900 via-violet-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 rounded-full px-4 py-2 mb-8">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">Start Your Protection Today</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1]">
              Ready to Take Control of<br />Your Music Career?
            </h2>
            
            <p className="text-xl md:text-2xl text-violet-100 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join hundreds of artists who refuse to sign bad deals. Get instant AI contract analysis, 
              transparent split tracking, automated royalty calculations, and complete career protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to={createPageUrl("Dashboard")}>
                <Button size="lg" className="bg-white text-violet-600 hover:bg-slate-100 px-12 h-16 text-xl font-bold shadow-2xl group">
                  Get Full Access Now
                  <Shield className="w-6 h-6 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl("ContractAnalyzer")}>
                <Button size="lg" variant="outline" className="bg-purple-500 text-white px-12 text-xl font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none shadow-sm hover:text-accent-foreground border-2 border-white/50 hover:bg-white/10 backdrop-blur h-16">
                  Analyze First Contract Free
                  <FileText className="w-6 h-6 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-violet-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Instant AI analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Full platform access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-950 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/50">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-bold text-2xl">RAP</p>
                  <p className="text-sm text-violet-300">Real Artist Protection</p>
                </div>
              </div>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed max-w-md">
                The first AI-powered platform built to protect music creators from unfair deals, 
                track royalties transparently, and build verifiable trust in the industry.
              </p>
              <div className="flex gap-4">
                <Link to={createPageUrl("Dashboard")}>
                  <Button className="bg-violet-600 hover:bg-violet-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Platform</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link to={createPageUrl("ContractAnalyzer")} className="hover:text-violet-400 transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Contract Analyzer
                </Link></li>
                <li><Link to={createPageUrl("SplitSheetBuilder")} className="hover:text-violet-400 transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" /> Split Sheets
                </Link></li>
                <li><Link to={createPageUrl("Royalties")} className="hover:text-violet-400 transition-colors flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Royalties
                </Link></li>
                <li><Link to={createPageUrl("AIAdvisor")} className="hover:text-violet-400 transition-colors flex items-center gap-2">
                  <Bot className="w-4 h-4" /> AI Advisor
                </Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link to={createPageUrl("AboutUs")} className="hover:text-violet-400 transition-colors">About Us</Link></li>
                <li><Link to={createPageUrl("Dashboard")} className="hover:text-violet-400 transition-colors">Dashboard</Link></li>
                <li><Link to={createPageUrl("TrustProfile")} className="hover:text-violet-400 transition-colors">Trust Score</Link></li>
                <li><Link to={createPageUrl("Settings")} className="hover:text-violet-400 transition-colors">Settings</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400">
              © 2026 RAP - Real Artist Protection. Empowering music creators worldwide.
            </p>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span>Built with ❤️ for Artists</span>
              <span>•</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>);

}