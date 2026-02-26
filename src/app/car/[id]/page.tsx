"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ListingCard } from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/Button";
import type { CarRecommendation } from "@/types/recommendation";
import type { Listing } from "@/types/listings";
import { ChevronLeft, Fuel, Users, Package, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { formatPriceCompact } from "@/lib/utils";

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const carId = params.id as string;

  const [rec, setRec] = useState<CarRecommendation | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [listingsError, setListingsError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load recommendation from sessionStorage
  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("carfinder_results");
    if (!stored) {
      router.replace("/quiz");
      return;
    }
    try {
      const results: CarRecommendation[] = JSON.parse(stored);
      const found = results.find((r) => r.id === carId);
      if (!found) {
        router.replace("/results");
        return;
      }
      setRec(found);
    } catch {
      router.replace("/results");
    }
  }, [carId, router]);

  // Fetch listings once we have the rec
  useEffect(() => {
    if (!rec) return;
    const zip = sessionStorage.getItem("carfinder_zipcode") || "90210";

    const fetchListings = async () => {
      setListingsLoading(true);
      setListingsError(null);
      try {
        const params = new URLSearchParams({
          make: rec.searchTerms.make,
          model: rec.searchTerms.model,
          yearMin: String(rec.searchTerms.yearMin),
          yearMax: String(rec.searchTerms.yearMax),
          zip,
        });
        const res = await fetch(`/api/listings?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        setListings(data.listings || []);
      } catch (err) {
        setListingsError(err instanceof Error ? err.message : "Failed to load listings");
      } finally {
        setListingsLoading(false);
      }
    };

    fetchListings();
  }, [rec]);

  if (!mounted || !rec) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-indigo-400 border-r-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800/50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/results"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            <ChevronLeft size={16} />
            Back to results
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8">
        {/* Car title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-zinc-50">
            {rec.year} {rec.make} {rec.model}
          </h1>
          <p className="text-zinc-400 mt-1">
            {rec.trim} · {rec.category} · {rec.fuelType}
          </p>

          {/* Price */}
          <div className="mt-3 inline-flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-indigo-400">
              {formatPriceCompact(rec.priceRange.low)}–{formatPriceCompact(rec.priceRange.high)}
            </span>
            <span className="text-zinc-500 text-sm font-mono">
              ≈ ${rec.priceRange.monthlyEstimate}/mo
            </span>
          </div>
        </motion.div>

        {/* Why it fits */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 mb-6"
        >
          <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">
            Why it fits you
          </div>
          <p className="text-zinc-200 text-sm leading-relaxed">{rec.whyItFits}</p>
        </motion.div>

        {/* Specs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
            <Fuel size={16} className="text-zinc-500 mx-auto mb-1.5" />
            <div className="font-mono font-bold text-zinc-200">{rec.specs.mpg}</div>
            <div className="text-zinc-500 text-xs">MPG</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
            <Users size={16} className="text-zinc-500 mx-auto mb-1.5" />
            <div className="font-mono font-bold text-zinc-200">{rec.specs.seating}</div>
            <div className="text-zinc-500 text-xs">Seats</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
            <Package size={16} className="text-zinc-500 mx-auto mb-1.5" />
            <div className="font-mono font-bold text-zinc-200">{rec.specs.cargoSf}</div>
            <div className="text-zinc-500 text-xs">Cargo</div>
          </div>
        </motion.div>

        {/* Pros & Cons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-8"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2.5">Pros</div>
              <ul className="space-y-2">
                {rec.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold flex-shrink-0 mt-0.5">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2.5">Cons</div>
              <ul className="space-y-2">
                {rec.cons.map((con, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                    <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">−</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Listings section */}
        <div>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">
            Listings Near You
          </h2>

          {listingsLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-7 h-7 rounded-full border-2 border-transparent border-t-indigo-400 border-r-indigo-400 animate-spin" />
            </div>
          )}

          {listingsError && (
            <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 text-sm">{listingsError}</p>
                <button
                  onClick={() => {
                    const zip = sessionStorage.getItem("carfinder_zipcode") || "90210";
                    const fetchListings = async () => {
                      setListingsLoading(true);
                      setListingsError(null);
                      try {
                        const p = new URLSearchParams({
                          make: rec.searchTerms.make,
                          model: rec.searchTerms.model,
                          yearMin: String(rec.searchTerms.yearMin),
                          yearMax: String(rec.searchTerms.yearMax),
                          zip,
                        });
                        const res = await fetch(`/api/listings?${p.toString()}`);
                        const data = await res.json();
                        setListings(data.listings || []);
                      } catch (err) {
                        setListingsError(err instanceof Error ? err.message : "Failed");
                      } finally {
                        setListingsLoading(false);
                      }
                    };
                    fetchListings();
                  }}
                  className="text-red-400 text-sm mt-1 hover:text-red-300 flex items-center gap-1"
                >
                  <RefreshCw size={12} />
                  Try again
                </button>
              </div>
            </div>
          )}

          {!listingsLoading && !listingsError && listings.length === 0 && (
            <div className="text-center py-10 text-zinc-500">
              <p>No listings found in your area.</p>
              <p className="text-sm mt-1">Try expanding your search radius.</p>
            </div>
          )}

          {!listingsLoading && listings.length > 0 && (
            <div className="space-y-3">
              {listings.map((listing, i) => (
                <ListingCard key={listing.id} listing={listing} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
