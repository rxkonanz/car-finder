"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { Button } from "@/components/ui/Button";
import type { CarRecommendation } from "@/types/recommendation";
import { RotateCcw, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<CarRecommendation[] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("carfinder_results");
    if (!stored) {
      router.replace("/quiz");
      return;
    }
    try {
      setRecommendations(JSON.parse(stored));
    } catch {
      router.replace("/quiz");
    }
  }, [router]);

  if (!mounted || !recommendations) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-indigo-400 border-r-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800/50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/quiz" className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 text-sm transition-colors">
            <ChevronLeft size={16} />
            Back to quiz
          </Link>
          <Link
            href="/quiz"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            <RotateCcw size={14} />
            Start over
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">Your Top 3 Matches</h1>
          <p className="text-zinc-400">
            Personalized picks based on your lifestyle and budget.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-6">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={rec.id} rec={rec} index={i} />
          ))}
        </div>

        {/* Footer actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-zinc-500 text-sm mb-4">
            Not quite right? Tweak your answers for different results.
          </p>
          <Button
            variant="outline"
            size="md"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <RotateCcw size={15} />
            Retake the quiz
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
