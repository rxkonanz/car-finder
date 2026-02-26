import type {
  LifestyleOption,
  PassengerOption,
  EnvironmentOption,
  PriorityOption,
  CargoOption,
} from "@/types/quiz";

export interface OptionDef {
  value: string;
  label: string;
  description?: string;
  emoji?: string;
}

export const LIFESTYLE_OPTIONS: { value: LifestyleOption; label: string; description: string; emoji: string }[] = [
  {
    value: "city_commuter",
    label: "City Commuter",
    description: "Navigating traffic, parking garages, urban streets",
    emoji: "🏙️",
  },
  {
    value: "young_family",
    label: "Young Family",
    description: "Car seats, soccer practice, family road trips",
    emoji: "👨‍👩‍👧‍👦",
  },
  {
    value: "outdoor_adventurer",
    label: "Outdoor Adventurer",
    description: "Trails, camping, ski racks, muddy boots",
    emoji: "🏕️",
  },
  {
    value: "empty_nester",
    label: "Empty Nester",
    description: "Comfort, style, and the open road ahead",
    emoji: "🌅",
  },
  {
    value: "daily_grinder",
    label: "Daily Grinder",
    description: "Long commutes, fuel efficiency, reliability",
    emoji: "⚡",
  },
];

export const PASSENGER_OPTIONS: { value: PassengerOption; label: string; description: string; emoji: string }[] = [
  {
    value: "just_me",
    label: "Just Me",
    description: "Flying solo",
    emoji: "🧑",
  },
  {
    value: "partner",
    label: "Me + Partner",
    description: "The two of us",
    emoji: "👫",
  },
  {
    value: "with_kids",
    label: "With Kids",
    description: "Family of 3–5",
    emoji: "👧‍👦",
  },
  {
    value: "often_4plus",
    label: "Often 4+",
    description: "Group outings, carpools",
    emoji: "👥",
  },
];

export const ENVIRONMENT_OPTIONS: { value: EnvironmentOption; label: string; description: string; emoji: string }[] = [
  {
    value: "city",
    label: "City Streets",
    description: "Stop-and-go, tight parking, urban jungle",
    emoji: "🚦",
  },
  {
    value: "suburbs_highway",
    label: "Suburbs & Highway",
    description: "Smooth roads, moderate speeds, parking lots",
    emoji: "🛣️",
  },
  {
    value: "rural_open",
    label: "Rural & Open Roads",
    description: "Long stretches, maybe some unpaved roads",
    emoji: "🌾",
  },
  {
    value: "mixed",
    label: "Mixed",
    description: "A bit of everything",
    emoji: "🗺️",
  },
];

export const PRIORITY_OPTIONS: { value: PriorityOption; label: string; emoji: string }[] = [
  { value: "safety", label: "Safety", emoji: "🛡️" },
  { value: "reliability", label: "Reliability", emoji: "🔧" },
  { value: "comfort", label: "Comfort", emoji: "💺" },
  { value: "tech", label: "Tech Features", emoji: "📱" },
  { value: "fuel_economy", label: "Fuel Economy", emoji: "⛽" },
  { value: "cargo", label: "Cargo Space", emoji: "📦" },
  { value: "style", label: "Style", emoji: "✨" },
];

export const CARGO_OPTIONS: { value: CargoOption; label: string; description: string; emoji: string }[] = [
  {
    value: "minimal",
    label: "Minimal",
    description: "Laptop bag, groceries, everyday carry",
    emoji: "🎒",
  },
  {
    value: "weekend_bags",
    label: "Weekend Bags",
    description: "Suitcases for a weekend trip",
    emoji: "🧳",
  },
  {
    value: "stroller_sports",
    label: "Stroller & Sports",
    description: "Bikes, strollers, beach chairs, gear",
    emoji: "🚲",
  },
  {
    value: "hauling",
    label: "Hauling Capacity",
    description: "Furniture, equipment, large loads",
    emoji: "📦",
  },
];

export const CONDITION_OPTIONS = [
  { value: "new" as const, label: "New" },
  { value: "cpo" as const, label: "CPO" },
  { value: "used" as const, label: "Used" },
];

export const BUDGET_MIN = 200;
export const BUDGET_MAX = 1500;
export const BUDGET_DEFAULT = 600;

// Maps monthly payment to estimated purchase price
export function monthlyToPurchase(monthly: number): string {
  const purchase = monthly * 72 * 0.92;
  if (purchase >= 1000000) return "$1M+";
  if (purchase >= 100000) return `$${Math.round(purchase / 1000)}k`;
  return `$${Math.round(purchase / 1000)}k`;
}

export const QUESTIONS = [
  {
    id: "lifestyle" as const,
    step: 1,
    title: "What best describes your lifestyle?",
    subtitle: "This helps us match your personality to the right type of car.",
  },
  {
    id: "passengers" as const,
    step: 2,
    title: "Who usually rides with you?",
    subtitle: "We'll make sure there's enough room for everyone.",
  },
  {
    id: "environment" as const,
    step: 3,
    title: "Where do you do most of your driving?",
    subtitle: "Your driving environment shapes what kind of car works best.",
  },
  {
    id: "priorities" as const,
    step: 4,
    title: "What matters most to you?",
    subtitle: "Select everything that's important. We'll weight your top priorities.",
  },
  {
    id: "cargo" as const,
    step: 5,
    title: "How much cargo space do you need?",
    subtitle: "Think about your busiest days, not average ones.",
  },
  {
    id: "condition" as const,
    step: 6,
    title: "New, certified pre-owned, or used?",
    subtitle: "Each has different tradeoffs in price, warranty, and selection.",
  },
  {
    id: "budget" as const,
    step: 7,
    title: "What's your monthly budget?",
    subtitle: "Based on a typical 72-month financing. Adjust to match your comfort zone.",
  },
  {
    id: "zipcode" as const,
    step: 8,
    title: "Where are you located?",
    subtitle: "We'll find matching cars at dealers near you.",
  },
];
