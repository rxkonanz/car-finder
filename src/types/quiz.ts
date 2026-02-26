export type QuestionId =
  | "lifestyle"
  | "passengers"
  | "environment"
  | "priorities"
  | "cargo"
  | "condition"
  | "budget"
  | "zipcode";

export type LifestyleOption =
  | "city_commuter"
  | "young_family"
  | "outdoor_adventurer"
  | "empty_nester"
  | "daily_grinder";

export type PassengerOption = "just_me" | "partner" | "with_kids" | "often_4plus";

export type EnvironmentOption = "city" | "suburbs_highway" | "rural_open" | "mixed";

export type PriorityOption =
  | "safety"
  | "reliability"
  | "comfort"
  | "tech"
  | "fuel_economy"
  | "cargo"
  | "style";

export type CargoOption = "minimal" | "weekend_bags" | "stroller_sports" | "hauling";

export type ConditionOption = "new" | "cpo" | "used";

export interface QuizAnswers {
  lifestyle: LifestyleOption | null;
  passengers: PassengerOption | null;
  environment: EnvironmentOption | null;
  priorities: PriorityOption[];
  cargo: CargoOption | null;
  condition: ConditionOption;
  budget: number;
  zipcode: string;
}
