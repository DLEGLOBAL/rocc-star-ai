import React from "react";
import { ArrowLeft, Shield, FileCheck, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-3xl mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to={createPageUrl("Dashboard")}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">About Us</h1>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            The music business runs on creativity — but it survives on paperwork.
          </h2>
          <p className="text-violet-100 text-lg">
            And for decades, that paperwork has quietly decided who gets paid… and who gets forgotten.
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8 mb-6">
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-4">
            I'm <span className="font-bold text-slate-900 dark:text-white">Roccstar</span> — a producer who built a career in real studios, real sessions, and real negotiations. I've worked with major artists, most notably Chris Brown, and across those years I witnessed a consistent truth:
          </p>
          <p className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            The biggest threat to artists isn't lack of talent — it's lack of protection.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Not just contracts.<br />
            Not just splits.<br />
            Not just publishing.
          </p>
          <p className="text-lg font-semibold text-violet-600 dark:text-violet-400 mt-4">
            Understanding. Enforcement. Memory. Evidence.
          </p>
        </div>

        {/* The Problem */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            The Problem I Saw From Inside The Industry
          </h3>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Behind every song release is a fragile chain of verbal agreements:
            </p>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 mb-6 space-y-2">
              <p className="text-slate-600 dark:text-slate-400 italic">"I'll send the splits later"</p>
              <p className="text-slate-600 dark:text-slate-400 italic">"We'll figure publishing out"</p>
              <p className="text-slate-600 dark:text-slate-400 italic">"You'll get your percentage"</p>
              <p className="text-slate-600 dark:text-slate-400 italic">"Trust me"</p>
            </div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
              Most artists don't get robbed in obvious ways.<br />
              They get erased in administrative ways.
            </p>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p>Credits disappear.</p>
              <p>Producers don't get backend.</p>
              <p>Writers never receive PRO registration.</p>
              <p>Managers negotiate without records.</p>
              <p>Contracts change after signing.</p>
              <p>Files get lost.</p>
              <p>Messages get deleted.</p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-6 mb-4">
              And by the time success arrives — the paperwork history is gone.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              I've watched talented creators contribute to records that went platinum… while their ownership never existed on paper in a provable, enforceable form.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Not because anyone planned fraud.
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white mt-2">
              Because the system itself was built on memory instead of verification.
            </p>
          </div>
        </div>

        {/* Why This Platform Exists */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Why This Platform Exists
          </h3>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <p className="text-slate-300 mb-4">This platform wasn't created as a software idea.</p>
            <p className="text-xl font-bold mb-6">It was created as a defense mechanism.</p>
            <p className="text-slate-300 leading-relaxed mb-4">
              After years inside label environments, sessions, publishing negotiations, and royalty disputes, I realized something critical:
            </p>
            <p className="text-slate-300 mb-2">Artists don't need another management tool.</p>
            <p className="text-xl font-bold text-violet-400">They need an intelligent witness.</p>
            <p className="text-slate-300 leading-relaxed mt-6">
              A system that doesn't just store agreements — it understands them, audits them, timestamps them, and defends them.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              So we built an AI-powered protection infrastructure that acts like a permanent business partner whose only job is to protect creative ownership.
            </p>
          </div>
        </div>

        {/* What Makes This Different */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            What Makes This Different
          </h3>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8 mb-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Traditional platforms organize files.<br />
              Lawyers interpret documents after problems happen.
            </p>
            <p className="text-xl font-bold text-violet-600 dark:text-violet-400 mb-6">
              Our system prevents disputes before they exist.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              The AI does four jobs simultaneously:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. Agreement Intelligence</h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Reads split sheets and contracts semantically — not just as PDFs — and verifies fairness, completeness, and missing terms.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. Audit Protection</h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">
                    Continuously scans agreements for risks:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                    <li>missing writers</li>
                    <li>conflicting percentages</li>
                    <li>unregistered compositions</li>
                    <li>unenforceable language</li>
                    <li>predatory clauses</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. Evidence Layer</h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">
                    Creates immutable proof of:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                    <li>contribution</li>
                    <li>communication</li>
                    <li>ownership timeline</li>
                    <li>version history</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">4. Artist Defense</h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    When a dispute occurs, the platform already holds the structured legal history required for enforcement.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 mt-2">
                    Not screenshots.<br />
                    Not memories.<br />
                    <span className="font-semibold">Structured proof.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            The Philosophy
          </h3>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Music creators are the only professionals expected to start businesses every day — without legal infrastructure.
            </p>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 mb-6 space-y-2">
              <p className="text-slate-700 dark:text-slate-300">A session is a company.</p>
              <p className="text-slate-700 dark:text-slate-300">A song is intellectual property.</p>
              <p className="text-slate-700 dark:text-slate-300">A verse is an asset.</p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              But artists have historically been asked to operate on trust while every other industry operates on verification.
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              This platform flips that imbalance.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Instead of teaching artists to become lawyers, we built a system that behaves like one — transparently, automatically, and continuously.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Our Mission
          </h3>
          <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-8 text-white">
            <p className="text-xl font-semibold mb-3">To make ownership in music automatic instead of negotiable.</p>
            <p className="text-xl font-semibold mb-3">To make contribution provable instead of arguable.</p>
            <p className="text-xl font-semibold">To make protection available before success instead of after loss.</p>
          </div>
        </div>

        {/* Closing */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            I didn't build this because artists don't trust people.<br />
            I built it because success magnifies misunderstandings — and misunderstandings destroy careers.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            If you create, write, produce, engineer, or collaborate, you deserve a permanent record of what you actually did.
          </p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            This platform exists so your legacy can never be rewritten by paperwork.
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white text-right">
            — Roccstar
          </p>
        </div>
      </div>
    </div>
  );
}