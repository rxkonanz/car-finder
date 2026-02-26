"use client";

import { motion } from "framer-motion";
import { useQuizStore } from "@/hooks/useQuizStore";
import { PRIORITY_OPTIONS } from "@/lib/constants";
import type { PriorityOption } from "@/types/quiz";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function PrioritiesQuestion() {
  const { answers, togglePriority, nextStep } = useQuizStore();

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-4">
        {PRIORITY_OPTIONS.map((opt) => {
          const selected = answers.priorities.includes(opt.value as PriorityOption);
          return (
            <motion.button
              key={opt.value}
              onClick={() => togglePriority(opt.value as PriorityOption)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 cursor-pointer",
                selected
                  ? "border-indigo-500 bg-indigo-500/15 text-indigo-300 shadow-sm shadow-indigo-500/20"
                  : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
              )}
              aria-pressed={selected}
            >
              <span aria-hidden="true">{opt.emoji}</span>
              {opt.label}
            </motion.button>
          );
        })}
      </div>

      <p className="text-zinc-500 text-sm mb-6">
        {answers.priorities.length === 0
          ? "Select at least one priority"
          : `${answers.priorities.length} selected`}
      </p>

      <div className="pb-8">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={nextStep}
          disabled={answers.priorities.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
