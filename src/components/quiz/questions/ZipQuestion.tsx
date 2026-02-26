"use client";

import { useState } from "react";
import { useQuizStore } from "@/hooks/useQuizStore";
import { Button } from "@/components/ui/Button";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function isValidZip(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

export function ZipQuestion() {
  const { answers, setZipcode, submitQuiz, status } = useQuizStore();
  const [touched, setTouched] = useState(false);
  const isValid = isValidZip(answers.zipcode);
  const showError = touched && answers.zipcode.length > 0 && !isValid;

  const handleSubmit = () => {
    if (isValid) {
      submitQuiz();
    }
  };

  return (
    <div>
      {/* Input */}
      <div className="mb-3">
        <div className="relative">
          <MapPin
            size={18}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
              isValid ? "text-indigo-400" : "text-zinc-500"
            )}
          />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="e.g. 90210"
            maxLength={5}
            value={answers.zipcode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 5);
              setZipcode(val);
              if (!touched) setTouched(true);
            }}
            onBlur={() => setTouched(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isValid) handleSubmit();
            }}
            className={cn(
              "w-full bg-zinc-900 border rounded-2xl pl-11 pr-4 py-4 text-xl font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all",
              showError
                ? "border-red-600 focus:ring-red-500"
                : isValid
                ? "border-indigo-500 focus:ring-indigo-500"
                : "border-zinc-700 focus:ring-indigo-500"
            )}
            aria-label="ZIP code"
            aria-describedby={showError ? "zip-error" : undefined}
          />
        </div>
        {showError && (
          <p id="zip-error" className="text-red-400 text-sm mt-2 ml-1">
            Please enter a valid 5-digit ZIP code
          </p>
        )}
      </div>

      {/* Privacy note */}
      <p className="text-zinc-500 text-sm mb-8 ml-1">
        Used only to find nearby dealer listings. We don't store your location.
      </p>

      {/* CTA */}
      <div className="pb-8">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={!isValid || status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Finding your matches...
            </>
          ) : (
            "See My Matches"
          )}
        </Button>
      </div>
    </div>
  );
}
