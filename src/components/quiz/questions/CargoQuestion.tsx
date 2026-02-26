"use client";

import { useQuizStore } from "@/hooks/useQuizStore";
import { CARGO_OPTIONS } from "@/lib/constants";
import { OptionCard } from "./OptionCard";
import { Button } from "@/components/ui/Button";

export function CargoQuestion() {
  const { answers, setCargo, nextStep } = useQuizStore();

  return (
    <div className="space-y-3">
      {CARGO_OPTIONS.map((opt) => (
        <OptionCard
          key={opt.value}
          value={opt.value}
          label={opt.label}
          description={opt.description}
          emoji={opt.emoji}
          selected={answers.cargo === opt.value}
          onClick={() => setCargo(opt.value)}
        />
      ))}
      <div className="pt-4 pb-8">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={nextStep}
          disabled={!answers.cargo}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
