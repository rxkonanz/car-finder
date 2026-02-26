"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X, Fuel, Users, Package, ArrowRight, Star } from "lucide-react";
import type { CarRecommendation } from "@/types/recommendation";
import { formatPrice, formatPriceCompact } from "@/lib/utils";

interface RecommendationCardProps {
  rec: CarRecommendation;
  index: number;
}

const RANK_LABELS = ["Best Match", "Great Alternative", "Worth Considering"];
const RANK_COLORS = [
  "from-indigo-500 to-violet-500",
  "from-violet-500 to-purple-500",
  "from-purple-500 to-fuchsia-500",
];

export function RecommendationCard({ rec, index }: RecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: index * 0.1,
      }}
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors">
        {/* Rank banner */}
        <div className={`bg-gradient-to-r ${RANK_COLORS[index]} px-5 py-2.5 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {index === 0 && <Star size={14} className="text-white fill-white" />}
            <span className="text-white text-sm font-semibold">{RANK_LABELS[index]}</span>
          </div>
          <span className="text-white/70 text-sm font-mono">#{rec.rank}</span>
        </div>

        <div className="p-5">
          {/* Car name */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-zinc-50 leading-tight">
                  {rec.year} {rec.make} {rec.model}
                </h3>
                <p className="text-zinc-400 text-sm mt-0.5">{rec.trim} · {rec.category}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-zinc-50 font-mono font-bold text-lg leading-none">
                  {formatPriceCompact(rec.priceRange.low)}–{formatPriceCompact(rec.priceRange.high)}
                </div>
                <div className="text-zinc-500 text-xs mt-1 font-mono">
                  ≈ ${rec.priceRange.monthlyEstimate}/mo
                </div>
              </div>
            </div>
          </div>

          {/* Why it fits */}
          <div className="bg-zinc-800/50 rounded-xl p-3.5 mb-4 border border-zinc-700/50">
            <p className="text-zinc-300 text-sm leading-relaxed">{rec.whyItFits}</p>
          </div>

          {/* Specs row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-zinc-800/40 rounded-lg p-2.5 text-center">
              <Fuel size={14} className="text-zinc-500 mx-auto mb-1" />
              <div className="text-zinc-200 text-sm font-mono font-semibold">{rec.specs.mpg}</div>
              <div className="text-zinc-500 text-xs">MPG</div>
            </div>
            <div className="bg-zinc-800/40 rounded-lg p-2.5 text-center">
              <Users size={14} className="text-zinc-500 mx-auto mb-1" />
              <div className="text-zinc-200 text-sm font-mono font-semibold">{rec.specs.seating}</div>
              <div className="text-zinc-500 text-xs">Seats</div>
            </div>
            <div className="bg-zinc-800/40 rounded-lg p-2.5 text-center">
              <Package size={14} className="text-zinc-500 mx-auto mb-1" />
              <div className="text-zinc-200 text-sm font-mono font-semibold">{rec.specs.cargoSf}</div>
              <div className="text-zinc-500 text-xs">Cargo</div>
            </div>
          </div>

          {/* Fuel type + drive */}
          <div className="flex gap-2 mb-4">
            <span className="px-2.5 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400">
              {rec.fuelType}
            </span>
            <span className="px-2.5 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400">
              {rec.specs.driveType}
            </span>
          </div>

          {/* Pros/Cons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Pros</div>
              <ul className="space-y-1.5">
                {rec.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Cons</div>
              <ul className="space-y-1.5">
                {rec.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <X size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/car/${rec.id}`}
            className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 rounded-xl py-3 text-sm font-semibold text-zinc-200 transition-all duration-150 group"
          >
            See Listings Near You
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
