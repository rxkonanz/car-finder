import { NextRequest, NextResponse } from "next/server";
import { getCarRecommendations } from "@/lib/claude";
import type { QuizAnswers } from "@/types/quiz";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as QuizAnswers;

    // Basic validation
    if (!body.lifestyle || !body.passengers || !body.environment || !body.cargo) {
      return NextResponse.json(
        { error: "Incomplete quiz answers" },
        { status: 400 }
      );
    }
    if (!body.zipcode || !/^\d{5}$/.test(body.zipcode)) {
      return NextResponse.json(
        { error: "Invalid ZIP code" },
        { status: 400 }
      );
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API not configured" },
        { status: 503 }
      );
    }

    const recommendations = await getCarRecommendations(body);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Recommend API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
