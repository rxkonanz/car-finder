import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceCompact(price: number): string {
  if (price >= 1000000) return "$1M+";
  if (price >= 10000) return `$${Math.round(price / 1000)}k`;
  return formatPrice(price);
}
