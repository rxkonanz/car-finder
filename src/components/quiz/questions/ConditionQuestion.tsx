"use client";

import { motion } from "framer-motion";
import { useQuizStore } from "@/hooks/useQuizStore";
import { CONDITION_OPTIONS } from "@/lib/constants";
import type { ConditionOption } from "@/types/quiz";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const CONDITION_DESCRIPTIONS: Record<ConditionOption, string> = {
  new: "Full warranty, latest features, highest price",
  cpo: "Manufacturer-inspected used car, extended warranty",
  used: "Best value, widest selection, buyer beware on history",
};

export function ConditionQuestion() {
  const { answers, setCondition, nextStep } = useQuizStore();

  return (
    <div>
      {/* Segmented control */}
      <div className="relative flex bg-zinc-900 rounded-2xl p-1.5 border border-zinc-800 mb-6">
        {CONDITION_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setCondition(opt.value)}
            className="relative flex-1 py-3 text-sm font-semibold rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900 cursor-pointer z-10"
            style={{ color: answers.condition === opt.value ? "#fff" : "#71717a" }}
          >
            {answers.condition === opt.value && (
              <motion.div
                layoutId="condition-indicator"
                className="absolute inset-0 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/30"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-8">
        <p className="text-zinc-300 text-sm leading-relaxed">
          {CONDITION_DESCRIPTIONS[answers.condition]}
        </p>
      </div>

      <div className="pb-8">
        <Button variant="primary" size="lg" className="w-full" onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
}
