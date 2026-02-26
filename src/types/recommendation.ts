export interface CarSpec {
  mpg: string;
  seating: number;
  cargoSf: string;
  driveType: string;
}

export interface PriceRange {
  low: number;
  high: number;
  monthlyEstimate: number;
}

export interface SearchTerms {
  make: string;
  model: string;
  yearMin: number;
  yearMax: number;
}

export interface CarRecommendation {
  id: string;
  rank: 1 | 2 | 3;
  make: string;
  model: string;
  year: number;
  trim: string;
  whyItFits: string;
  priceRange: PriceRange;
  specs: CarSpec;
  category: string;
  fuelType: string;
  pros: string[];
  cons: string[];
  searchTerms: SearchTerms;
}
