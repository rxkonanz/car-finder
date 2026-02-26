"use client";

import { useQuizStore } from "@/hooks/useQuizStore";
import { PASSENGER_OPTIONS } from "@/lib/constants";
import { OptionCard } from "./OptionCard";
import { Button } from "@/components/ui/Button";

export function PassengersQuestion() {
  const { answers, setPassengers, nextStep } = useQuizStore();

  return (
    <div className="space-y-3">
      {PASSENGER_OPTIONS.map((opt) => (
        <OptionCard
          key={opt.value}
          value={opt.value}
          label={opt.label}
          description={opt.description}
          emoji={opt.emoji}
          selected={answers.passengers === opt.value}
          onClick={() => setPassengers(opt.value)}
        />
      ))}
      <div className="pt-4 pb-8">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={nextStep}
          disabled={!answers.passengers}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
