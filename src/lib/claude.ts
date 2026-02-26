import Anthropic from "@anthropic-ai/sdk";
import type { QuizAnswers } from "@/types/quiz";
import type { CarRecommendation } from "@/types/recommendation";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const LIFESTYLE_LABELS: Record<string, string> = {
  city_commuter: "City Commuter",
  young_family: "Young Family",
  outdoor_adventurer: "Outdoor Adventurer",
  empty_nester: "Empty Nester",
  daily_grinder: "Daily Grinder",
};

const PASSENGER_LABELS: Record<string, string> = {
  just_me: "Just me",
  partner: "Me and a partner",
  with_kids: "With kids (family of 3–5)",
  often_4plus: "Often 4+ passengers",
};

const ENVIRONMENT_LABELS: Record<string, string> = {
  city: "Mostly city streets",
  suburbs_highway: "Suburbs and highway",
  rural_open: "Rural and open roads",
  mixed: "Mixed environments",
};

const PRIORITY_LABELS: Record<string, string> = {
  safety: "Safety",
  reliability: "Reliability",
  comfort: "Comfort",
  tech: "Tech features",
  fuel_economy: "Fuel economy",
  cargo: "Cargo space",
  style: "Style",
};

const CARGO_LABELS: Record<string, string> = {
  minimal: "Minimal (everyday carry)",
  weekend_bags: "Weekend bags (suitcases)",
  stroller_sports: "Stroller and sports equipment",
  hauling: "Heavy hauling capacity",
};

function buildPrompt(answers: QuizAnswers): string {
  const budgetLabel = answers.budget >= 1500 ? "$1,500+/mo" : `$${answers.budget}/mo`;
  const estimatedPurchase = answers.budget * 72 * 0.92;
  const priorities = answers.priorities.map((p) => PRIORITY_LABELS[p] || p).join(", ");

  return `You are a knowledgeable car expert helping a non-car-person find their perfect vehicle. Based on their answers, recommend exactly 3 cars that best match their lifestyle and needs.

USER PROFILE:
- Lifestyle: ${LIFESTYLE_LABELS[answers.lifestyle!] || answers.lifestyle}
- Typical passengers: ${PASSENGER_LABELS[answers.passengers!] || answers.passengers}
- Primary driving environment: ${ENVIRONMENT_LABELS[answers.environment!] || answers.environment}
- Top priorities: ${priorities}
- Cargo needs: ${CARGO_LABELS[answers.cargo!] || answers.cargo}
- Car condition preference: ${answers.condition === "new" ? "New" : answers.condition === "cpo" ? "Certified Pre-Owned (CPO)" : "Used"}
- Monthly budget: ${budgetLabel} (≈ $${Math.round(estimatedPurchase / 1000)}k purchase price)
- ZIP code: ${answers.zipcode}

INSTRUCTIONS:
- Recommend 3 distinct cars that genuinely fit this person's lifestyle, not generic "good cars"
- Vary the options (e.g., don't give 3 similar SUVs)
- For condition="used" or "cpo", target years 2–5 years old; for "new", target current/upcoming model year
- Make priceRange realistic for the condition and model year specified
- The "whyItFits" field must reference the user's SPECIFIC answers (e.g., "With kids in tow on suburban highways...")
- Be honest in cons — 1–2 real downsides
- The "id" must be a slug like "2024-toyota-rav4-hybrid"
- The searchTerms yearMin/yearMax should match the condition (new=current year, cpo=2–4 years old, used=3–6 years old)

Return ONLY valid JSON with no markdown, no explanation, matching this exact schema.`;
}

const recommendationSchema = {
  type: "object" as const,
  properties: {
    recommendations: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          rank: { type: "number" as const, enum: [1, 2, 3] },
          make: { type: "string" as const },
          model: { type: "string" as const },
          year: { type: "number" as const },
          trim: { type: "string" as const },
          whyItFits: { type: "string" as const },
          priceRange: {
            type: "object" as const,
            properties: {
              low: { type: "number" as const },
              high: { type: "number" as const },
              monthlyEstimate: { type: "number" as const },
            },
            required: ["low", "high", "monthlyEstimate"],
          },
          specs: {
            type: "object" as const,
            properties: {
              mpg: { type: "string" as const },
              seating: { type: "number" as const },
              cargoSf: { type: "string" as const },
              driveType: { type: "string" as const },
            },
            required: ["mpg", "seating", "cargoSf", "driveType"],
          },
          category: { type: "string" as const },
          fuelType: { type: "string" as const },
          pros: { type: "array" as const, items: { type: "string" as const } },
          cons: { type: "array" as const, items: { type: "string" as const } },
          searchTerms: {
            type: "object" as const,
            properties: {
              make: { type: "string" as const },
              model: { type: "string" as const },
              yearMin: { type: "number" as const },
              yearMax: { type: "number" as const },
            },
            required: ["make", "model", "yearMin", "yearMax"],
          },
        },
        required: [
          "id",
          "rank",
          "make",
          "model",
          "year",
          "trim",
          "whyItFits",
          "priceRange",
          "specs",
          "category",
          "fuelType",
          "pros",
          "cons",
          "searchTerms",
        ],
      },
      minItems: 3,
      maxItems: 3,
    },
  },
  required: ["recommendations"],
};

export async function getCarRecommendations(
  answers: QuizAnswers
): Promise<CarRecommendation[]> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: buildPrompt(answers),
      },
    ],
    // Use tool_use as a structured output mechanism
    tools: [
      {
        name: "recommend_cars",
        description: "Return exactly 3 car recommendations in structured JSON",
        input_schema: recommendationSchema,
      },
    ],
    tool_choice: { type: "auto" },
  });

  // Extract tool use result
  const toolUse = message.content.find((block) => block.type === "tool_use");
  if (toolUse && toolUse.type === "tool_use") {
    const input = toolUse.input as { recommendations: CarRecommendation[] };
    return input.recommendations;
  }

  // Fallback: try to parse text content as JSON
  const textBlock = message.content.find((block) => block.type === "text");
  if (textBlock && textBlock.type === "text") {
    try {
      const parsed = JSON.parse(textBlock.text);
      return parsed.recommendations;
    } catch {
      throw new Error("Failed to parse recommendations from Claude response");
    }
  }

  throw new Error("No valid recommendations returned from Claude");
}
