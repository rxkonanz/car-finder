export interface Dealer {
  id: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance: number;
}

export interface Listing {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  mileage: number;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  stockNumber: string;
  condition: "new" | "used" | "cpo";
  dealer: Dealer;
  vdpUrl: string;
  imageUrl: string | null;
  daysOnMarket: number;
}
