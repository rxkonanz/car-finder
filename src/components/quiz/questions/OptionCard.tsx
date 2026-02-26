"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  value: string;
  label: string;
  description?: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ label, description, emoji, selected, onClick }: OptionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative w-full text-left rounded-2xl border p-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 cursor-pointer",
        selected
          ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
          : "border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800/60"
      )}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        {emoji && (
          <span className="text-2xl leading-none mt-0.5 flex-shrink-0" aria-hidden="true">
            {emoji}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-zinc-100 text-base leading-snug">{label}</div>
          {description && (
            <div className="text-zinc-400 text-sm mt-0.5 leading-snug">{description}</div>
          )}
        </div>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5"
          >
            <Check size={12} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
