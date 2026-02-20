import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Shield, FileText, Users, Wallet, TrendingUp, 
  Sparkles, CheckCircle, AlertTriangle, Lock, 
  Eye, Scale, Award, Zap, ArrowRight, Star,
  FileCheck, DollarSign, UserCheck, Bot, Bell,
  LineChart, ChevronRight, Music, Handshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      "Multi-format support (PDF, Word)"
    ],
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
      "ISRC code integration"
    ],
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
      "Export reports for accounting"
    ],
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
      "Industry reputation building"
    ],
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
      "Plain English explanations"
    ],
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
      "Multi-currency support"
    ],
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
      "Priority-based sorting"
    ],
    gradient: "from-red-500 to-pink-600",
    icon_bg: "bg-red-100 text-red-600"
  }
];

const stats = [
  { value: "98%", label: "Unfair terms detected", icon: Eye },
  { value: "$2M+", label: "Protected for artists", icon: Shield },
  { value: "15min", label: "Average analysis time", icon: Zap },
  { value: "500+", label: "Artists protected", icon: UserCheck }
];

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
  }
];

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
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-blue-600/10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-24">
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  RAP
                </h1>
                <p className="text-sm text-slate-600 font-medium">Real Artist Protection</p>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Never Sign a Bad Deal Again
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              AI-powered contract analysis, smart split sheets, automated royalty tracking, 
              and trust scoring – all in one platform built to protect music creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Dashboard")}>
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 h-14 text-lg">
                  Get Protected Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("AIAdvisor")}>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2">
                  Try AI Advisor Free
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur rounded-2xl p-6 text-center border border-slate-100">
                <stat.icon className="w-8 h-8 text-violet-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Stay Protected
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From contract analysis to royalty tracking, we've built every tool you need 
              to take control of your music career.
            </p>
          </div>

          <div className="space-y-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-100 hover:border-slate-200 transition-all hover:shadow-xl"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center",
                      feature.icon_bg
                    )}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {feature.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How RAP Protects You</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Four simple steps to complete protection for your music career
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 h-full border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <item.icon className="w-8 h-8 text-violet-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </div>
                {idx < howItWorks.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-white/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why RAP Section */}
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Why Artists Trust RAP
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">Industry-First AI Analysis</h3>
                    <p className="text-slate-600">
                      Our AI is trained on thousands of music contracts and knows the industry inside out. 
                      We catch what humans miss.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">Built by Artists, For Artists</h3>
                    <p className="text-slate-600">
                      We understand the struggles because we've lived them. RAP was created to level 
                      the playing field in the music industry.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">Complete Transparency</h3>
                    <p className="text-slate-600">
                      Every dollar, every split, every clause – everything is clear and tracked. 
                      No more mystery deals or hidden terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">What You Get</h3>
              <ul className="space-y-4">
                {[
                  "Unlimited contract analysis",
                  "Unlimited split sheets",
                  "Automated royalty tracking",
                  "AI deal advisor access",
                  "Trust score building",
                  "Real-time collaboration",
                  "Version history & comments",
                  "Smart alerts & notifications",
                  "Wallet & payment tracking",
                  "Industry standard comparisons"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to={createPageUrl("Dashboard")}>
                <Button className="w-full mt-8 bg-white text-violet-600 hover:bg-slate-100 h-12 text-lg font-semibold">
                  Start Protecting Your Rights
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trusted by Creators Worldwide
            </h2>
            <p className="text-xl text-slate-600">
              See what artists are saying about RAP
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <p className="text-sm font-medium text-slate-900">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-violet-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Protect Your Music Career?
          </h2>
          <p className="text-xl text-violet-100 mb-8 leading-relaxed">
            Join hundreds of artists who refuse to sign bad deals. Get instant AI analysis, 
            smart split sheets, and complete transparency in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="bg-white text-violet-600 hover:bg-slate-100 px-8 h-14 text-lg font-semibold">
                Get Started Free
                <Shield className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("ContractAnalyzer")}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
                Analyze a Contract
                <FileText className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-violet-200 text-sm">
            No credit card required • Full access to all features • Cancel anytime
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">RAP</p>
                  <p className="text-xs text-slate-400">Real Artist Protection</p>
                </div>
              </div>
              <p className="text-slate-400 mb-4">
                Empowering music creators with AI-powered legal protection, 
                transparent royalty tracking, and industry-leading contract analysis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to={createPageUrl("ContractAnalyzer")} className="hover:text-white">Contract Analyzer</Link></li>
                <li><Link to={createPageUrl("SplitSheetBuilder")} className="hover:text-white">Split Sheets</Link></li>
                <li><Link to={createPageUrl("Royalties")} className="hover:text-white">Royalties</Link></li>
                <li><Link to={createPageUrl("AIAdvisor")} className="hover:text-white">AI Advisor</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to={createPageUrl("AboutUs")} className="hover:text-white">About Us</Link></li>
                <li><Link to={createPageUrl("Dashboard")} className="hover:text-white">Dashboard</Link></li>
                <li><Link to={createPageUrl("Settings")} className="hover:text-white">Settings</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
            <p>© 2026 RAP - Real Artist Protection. Built to protect music creators.</p>
          </div>
        </div>
      </div>
    </div>
  );
}