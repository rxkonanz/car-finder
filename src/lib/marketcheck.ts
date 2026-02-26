import type { Listing, Dealer } from "@/types/listings";

export interface ListingsQuery {
  make: string;
  model: string;
  yearMin: number;
  yearMax: number;
  zip: string;
  radius?: number;
  condition?: "new" | "used" | "cpo";
}

// ─── Stub data ───────────────────────────────────────────────────────────────

function makeStubListings(query: ListingsQuery): Listing[] {
  const colors = ["Midnight Black", "Pearl White", "Silver", "Deep Blue", "Titanium Gray"];
  const dealers: Dealer[] = [
    {
      id: "d1",
      name: `${query.make} of Downtown`,
      city: "Springfield",
      state: "IL",
      zip: query.zip,
      phone: "(555) 234-5678",
      distance: 2.4,
    },
    {
      id: "d2",
      name: `Metro ${query.make} Auto`,
      city: "Shelbyville",
      state: "IL",
      zip: query.zip,
      phone: "(555) 876-5432",
      distance: 8.1,
    },
    {
      id: "d3",
      name: `${query.make} Superstore`,
      city: "Capital City",
      state: "IL",
      zip: query.zip,
      phone: "(555) 345-6789",
      distance: 14.7,
    },
    {
      id: "d4",
      name: `Premier ${query.make}`,
      city: "Ogdenville",
      state: "IL",
      zip: query.zip,
      phone: "(555) 456-7890",
      distance: 22.3,
    },
  ];

  const basePrices = [26900, 29500, 31200, 34800, 28700, 33400];

  return Array.from({ length: 6 }, (_, i) => {
    const dealer = dealers[i % dealers.length];
    const year = query.yearMin + (i % (query.yearMax - query.yearMin + 1));
    const basePrice = basePrices[i];
    const isNew = query.condition === "new";
    const isCpo = query.condition === "cpo";

    return {
      id: `stub-${i + 1}`,
      make: query.make,
      model: query.model,
      year,
      trim: i % 2 === 0 ? "LE" : i % 3 === 0 ? "XLE" : "Limited",
      price: isNew ? basePrice + 1500 : isCpo ? basePrice - 3000 : basePrice - 6000,
      mileage: isNew ? 5 : isCpo ? 18000 + i * 3000 : 35000 + i * 8000,
      exteriorColor: colors[i % colors.length],
      interiorColor: i % 2 === 0 ? "Black" : "Gray",
      vin: `STUB${String(i + 1).padStart(13, "0")}`,
      stockNumber: `S${10000 + i}`,
      condition: isNew ? "new" : isCpo ? "cpo" : "used",
      dealer,
      vdpUrl: `https://www.cars.com/vehicledetail/stub-${i + 1}/`,
      imageUrl: null,
      daysOnMarket: isNew ? 0 : 5 + i * 7,
    };
  });
}

// ─── Live MarketCheck API ────────────────────────────────────────────────────

async function fetchLiveListings(query: ListingsQuery): Promise<Listing[]> {
  const apiKey = process.env.MARKETCHECK_API_KEY;
  if (!apiKey) throw new Error("MARKETCHECK_API_KEY not configured");

  const params = new URLSearchParams({
    api_key: apiKey,
    make: query.make,
    model: query.model,
    year_min: String(query.yearMin),
    year_max: String(query.yearMax),
    zip: query.zip,
    radius: String(query.radius ?? 50),
    rows: "6",
    start: "0",
  });

  if (query.condition) {
    params.set("car_type", query.condition === "cpo" ? "certified" : query.condition);
  }

  const res = await fetch(
    `https://marketcheck-prod.apigee.net/v2/search/car/active?${params.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error(`MarketCheck API error: ${res.status}`);
  }

  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.listings || []).map((l: any) => ({
    id: l.id,
    make: l.build.make,
    model: l.build.model,
    year: l.build.year,
    trim: l.build.trim || "",
    price: l.price || 0,
    mileage: l.miles || 0,
    exteriorColor: l.exterior_color || "Unknown",
    interiorColor: l.interior_color || "Unknown",
    vin: l.vin,
    stockNumber: l.seller_info?.stock_no || "",
    condition: l.car_type === "certified" ? "cpo" : l.car_type || "used",
    dealer: {
      id: l.dealer?.id || "",
      name: l.dealer?.name || "Unknown Dealer",
      city: l.dealer?.city || "",
      state: l.dealer?.state || "",
      zip: l.dealer?.zip || "",
      phone: l.dealer?.phone || "",
      distance: l.dist || 0,
    },
    vdpUrl: l.vdp_url || "#",
    imageUrl: l.media?.photo_links?.[0] || null,
    daysOnMarket: l.dom || 0,
  }));
}

// ─── Public export ───────────────────────────────────────────────────────────

export async function getListings(query: ListingsQuery): Promise<Listing[]> {
  const useStub = process.env.MARKETCHECK_USE_STUB !== "false";
  if (useStub) {
    return makeStubListings(query);
  }
  return fetchLiveListings(query);
}
