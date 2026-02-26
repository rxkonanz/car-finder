"use client";

import { useQuizStore } from "@/hooks/useQuizStore";
import { ENVIRONMENT_OPTIONS } from "@/lib/constants";
import { OptionCard } from "./OptionCard";
import { Button } from "@/components/ui/Button";

export function EnvironmentQuestion() {
  const { answers, setEnvironment, nextStep } = useQuizStore();

  return (
    <div className="space-y-3">
      {ENVIRONMENT_OPTIONS.map((opt) => (
        <OptionCard
          key={opt.value}
          value={opt.value}
          label={opt.label}
          description={opt.description}
          emoji={opt.emoji}
          selected={answers.environment === opt.value}
          onClick={() => setEnvironment(opt.value)}
        />
      ))}
      <div className="pt-4 pb-8">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={nextStep}
          disabled={!answers.environment}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
