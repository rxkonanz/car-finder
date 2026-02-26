"use client";

import { useQuizStore } from "@/hooks/useQuizStore";
import { LIFESTYLE_OPTIONS } from "@/lib/constants";
import { OptionCard } from "./OptionCard";
import { Button } from "@/components/ui/Button";

export function LifestyleQuestion() {
  const { answers, setLifestyle, nextStep } = useQuizStore();

  return (
    <div className="space-y-3">
      {LIFESTYLE_OPTIONS.map((opt) => (
        <OptionCard
          key={opt.value}
          value={opt.value}
          label={opt.label}
          description={opt.description}
          emoji={opt.emoji}
          selected={answers.lifestyle === opt.value}
          onClick={() => setLifestyle(opt.value)}
        />
      ))}
      <div className="pt-4 pb-8">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={nextStep}
          disabled={!answers.lifestyle}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
