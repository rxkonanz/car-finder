"use client";

import { motion } from "framer-motion";
import { useQuizStore } from "@/hooks/useQuizStore";
import { BUDGET_MIN, BUDGET_MAX, monthlyToPurchase } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function BudgetQuestion() {
  const { answers, setBudget, nextStep } = useQuizStore();
  const budget = answers.budget;
  const isMax = budget >= BUDGET_MAX;
  const pct = ((budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  return (
    <div>
      {/* Price display */}
      <div className="text-center mb-8">
        <div className="inline-flex flex-col items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-5">
          <span className="text-4xl font-bold font-mono text-indigo-400 tracking-tight">
            ${budget.toLocaleString()}
            {isMax && "+"}
            <span className="text-lg text-zinc-400 font-sans font-normal ml-1">/mo</span>
          </span>
          <span className="text-zinc-500 text-sm mt-1 font-mono">
            ≈ {monthlyToPurchase(budget)} purchase price
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="px-1 mb-4">
        <div className="relative">
          {/* Fill track */}
          <div
            className="absolute top-1/2 left-0 h-1.5 bg-indigo-500 rounded-full -translate-y-1/2 pointer-events-none"
            style={{ width: `${pct}%` }}
          />
          <input
            type="range"
            min={BUDGET_MIN}
            max={BUDGET_MAX}
            step={50}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full relative"
            aria-label="Monthly budget"
            aria-valuemin={BUDGET_MIN}
            aria-valuemax={BUDGET_MAX}
            aria-valuenow={budget}
            aria-valuetext={`$${budget}/month`}
          />
        </div>
        <div className="flex justify-between mt-3 text-xs text-zinc-500 font-mono">
          <span>${BUDGET_MIN}/mo</span>
          <span>${BUDGET_MAX}+/mo</span>
        </div>
      </div>

      {/* Budget tiers hint */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {[
          { label: "Economy", range: "$200–$400", active: budget <= 400 },
          { label: "Mid-range", range: "$400–$800", active: budget > 400 && budget <= 800 },
          { label: "Premium", range: "$800+", active: budget > 800 },
        ].map((tier) => (
          <div
            key={tier.label}
            className={`rounded-xl p-2.5 text-center border transition-colors ${
              tier.active
                ? "border-indigo-500/50 bg-indigo-500/10"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            <div className={`text-xs font-semibold ${tier.active ? "text-indigo-300" : "text-zinc-500"}`}>
              {tier.label}
            </div>
            <div className={`text-xs mt-0.5 font-mono ${tier.active ? "text-indigo-400" : "text-zinc-600"}`}>
              {tier.range}
            </div>
          </div>
        ))}
      </div>

      <div className="pb-8">
        <Button variant="primary" size="lg" className="w-full" onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
}
