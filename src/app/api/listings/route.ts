import { NextRequest, NextResponse } from "next/server";
import { getListings } from "@/lib/marketcheck";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const yearMin = searchParams.get("yearMin");
    const yearMax = searchParams.get("yearMax");
    const zip = searchParams.get("zip");
    const condition = searchParams.get("condition") as "new" | "used" | "cpo" | null;

    if (!make || !model || !yearMin || !yearMax || !zip) {
      return NextResponse.json(
        { error: "Missing required query parameters: make, model, yearMin, yearMax, zip" },
        { status: 400 }
      );
    }

    const listings = await getListings({
      make,
      model,
      yearMin: parseInt(yearMin, 10),
      yearMax: parseInt(yearMax, 10),
      zip,
      condition: condition ?? undefined,
    });

    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Listings API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
