"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";

const FEATURES = [
  {
    icon: "✦",
    title: "8 quick questions",
    description: "About your lifestyle, not car specs",
  },
  {
    icon: "◈",
    title: "AI-powered matches",
    description: "Claude picks your top 3 based on real data",
  },
  {
    icon: "◎",
    title: "Local dealer listings",
    description: "Real inventory near your ZIP code",
  },
];

const TESTIMONIALS = [
  {
    quote: "I had no idea what I needed. This nailed it — bought my first SUV and love it.",
    name: "Sarah M.",
    city: "Austin, TX",
  },
  {
    quote: "Saved me hours of research. The top match was exactly right for my commute.",
    name: "James K.",
    city: "Denver, CO",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-2xl mx-auto px-4 pt-20 pb-24">
        {/* Logo/brand */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-12"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-zinc-200 text-lg tracking-tight">CarFinder</span>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-50 leading-[1.15] mb-5">
            Find your perfect car.{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              No car knowledge required.
            </span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
            Tell us about your life — your commute, your family, your budget. We&apos;ll use AI to recommend
            the 3 cars that actually fit, and show you real inventory at dealers nearby.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-14"
        >
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2.5 bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Find My Car
            <ArrowRight size={20} />
          </Link>
          <p className="text-zinc-500 text-sm mt-3 ml-1">
            Takes about 2 minutes · Free · No account needed
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
            >
              <div className="text-indigo-400 text-xl mb-2 font-mono">{f.icon}</div>
              <div className="font-semibold text-zinc-200 text-sm mb-1">{f.title}</div>
              <div className="text-zinc-500 text-sm leading-snug">{f.description}</div>
            </div>
          ))}
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mb-16"
        >
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-5">
            How it works
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Answer 8 lifestyle questions",
                desc: "Things like: where you drive, who rides with you, what you care about.",
              },
              {
                step: "02",
                title: "Claude AI analyzes your profile",
                desc: "We cross-reference 200+ models against your real-world needs.",
              },
              {
                step: "03",
                title: "Get your top 3 matches",
                desc: "Each with an honest explanation, specs, pros & cons.",
              },
              {
                step: "04",
                title: "Browse local inventory",
                desc: "See real listings near your ZIP code and click through to the dealer.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="font-mono text-xs text-zinc-600 font-bold w-6 pt-0.5 flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-semibold text-zinc-200 text-sm">{item.title}</div>
                  <div className="text-zinc-500 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-5">
            What people say
          </h2>
          <div className="space-y-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-300 text-sm leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-zinc-300 text-xs font-semibold">{t.name}</div>
                    <div className="text-zinc-600 text-xs flex items-center gap-1">
                      <MapPin size={9} />
                      {t.city}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="text-center"
        >
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-200 font-semibold px-6 py-3 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Get Started — It&apos;s Free
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
