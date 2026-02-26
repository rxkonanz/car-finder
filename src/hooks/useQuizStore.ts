"use client";

import { create } from "zustand";
import type { QuizAnswers, PriorityOption, ConditionOption } from "@/types/quiz";
import type { CarRecommendation } from "@/types/recommendation";
import { BUDGET_DEFAULT } from "@/lib/constants";

export type QuizStatus = "idle" | "loading" | "success" | "error";

interface QuizStore {
  currentStep: number;
  answers: QuizAnswers;
  status: QuizStatus;
  errorMessage: string | null;
  recommendations: CarRecommendation[] | null;

  // Navigation
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Answer setters
  setLifestyle: (value: QuizAnswers["lifestyle"]) => void;
  setPassengers: (value: QuizAnswers["passengers"]) => void;
  setEnvironment: (value: QuizAnswers["environment"]) => void;
  togglePriority: (value: PriorityOption) => void;
  setCargo: (value: QuizAnswers["cargo"]) => void;
  setCondition: (value: ConditionOption) => void;
  setBudget: (value: number) => void;
  setZipcode: (value: string) => void;

  // Submission
  submitQuiz: () => Promise<void>;
  reset: () => void;
}

const defaultAnswers: QuizAnswers = {
  lifestyle: null,
  passengers: null,
  environment: null,
  priorities: [],
  cargo: null,
  condition: "new",
  budget: BUDGET_DEFAULT,
  zipcode: "",
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentStep: 1,
  answers: { ...defaultAnswers },
  status: "idle",
  errorMessage: null,
  recommendations: null,

  goToStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 8) set({ currentStep: currentStep + 1 });
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) set({ currentStep: currentStep - 1 });
  },

  setLifestyle: (value) =>
    set((s) => ({ answers: { ...s.answers, lifestyle: value } })),

  setPassengers: (value) =>
    set((s) => ({ answers: { ...s.answers, passengers: value } })),

  setEnvironment: (value) =>
    set((s) => ({ answers: { ...s.answers, environment: value } })),

  togglePriority: (value) =>
    set((s) => {
      const current = s.answers.priorities;
      const next = current.includes(value)
        ? current.filter((p) => p !== value)
        : [...current, value];
      return { answers: { ...s.answers, priorities: next } };
    }),

  setCargo: (value) =>
    set((s) => ({ answers: { ...s.answers, cargo: value } })),

  setCondition: (value) =>
    set((s) => ({ answers: { ...s.answers, condition: value } })),

  setBudget: (value) =>
    set((s) => ({ answers: { ...s.answers, budget: value } })),

  setZipcode: (value) =>
    set((s) => ({ answers: { ...s.answers, zipcode: value } })),

  submitQuiz: async () => {
    const { answers } = get();
    set({ status: "loading", errorMessage: null });

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      const recommendations: CarRecommendation[] = data.recommendations;

      // Persist to sessionStorage for navigation
      sessionStorage.setItem("carfinder_results", JSON.stringify(recommendations));
      sessionStorage.setItem("carfinder_zipcode", answers.zipcode);

      set({ recommendations, status: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      set({ status: "error", errorMessage: message });
    }
  },

  reset: () =>
    set({
      currentStep: 1,
      answers: { ...defaultAnswers },
      status: "idle",
      errorMessage: null,
      recommendations: null,
    }),
}));
