"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useQuizStore } from "@/hooks/useQuizStore";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import { QUESTIONS } from "@/lib/constants";
import { LifestyleQuestion } from "./questions/LifestyleQuestion";
import { PassengersQuestion } from "./questions/PassengersQuestion";
import { EnvironmentQuestion } from "./questions/EnvironmentQuestion";
import { PrioritiesQuestion } from "./questions/PrioritiesQuestion";
import { CargoQuestion } from "./questions/CargoQuestion";
import { ConditionQuestion } from "./questions/ConditionQuestion";
import { BudgetQuestion } from "./questions/BudgetQuestion";
import { ZipQuestion } from "./questions/ZipQuestion";
import { LoadingScreen } from "@/components/results/LoadingScreen";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const QUESTION_COMPONENTS = [
  LifestyleQuestion,
  PassengersQuestion,
  EnvironmentQuestion,
  PrioritiesQuestion,
  CargoQuestion,
  ConditionQuestion,
  BudgetQuestion,
  ZipQuestion,
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function QuizShell() {
  const { currentStep, status, prevStep, recommendations } = useQuizStore();
  const router = useRouter();
  const question = QUESTIONS[currentStep - 1];
  const QuestionComponent = QUESTION_COMPONENTS[currentStep - 1];

  useEffect(() => {
    if (status === "success" && recommendations) {
      router.push("/results");
    }
  }, [status, recommendations, router]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div className="flex-1">
            <ProgressBar current={currentStep} total={8} />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 px-4 max-w-2xl mx-auto w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={currentStep}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Question header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-50 leading-tight mb-2">
                {question.title}
              </h1>
              <p className="text-zinc-400 text-base leading-relaxed">{question.subtitle}</p>
            </div>

            {/* Question content */}
            {QuestionComponent && <QuestionComponent />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error display */}
      {status === "error" && (
        <div className="px-4 pb-4 max-w-2xl mx-auto w-full">
          <div className="bg-red-950/50 border border-red-800 rounded-xl p-4 text-red-300 text-sm">
            Something went wrong. Please try again.
          </div>
        </div>
      )}
    </div>
  );
}
