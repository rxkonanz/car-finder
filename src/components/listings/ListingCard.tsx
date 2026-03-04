"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink, Clock, Gauge } from "lucide-react";
import type { Listing } from "@/types/listings";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { utagLink } from "@/lib/tealium";

interface ListingCardProps {
  listing: Listing;
  index: number;
}

const CONDITION_LABELS: Record<string, { label: string; class: string }> = {
  new: { label: "New", class: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  cpo: { label: "CPO", class: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  used: { label: "Used", class: "bg-zinc-700 text-zinc-400 border-zinc-600" },
};

export function ListingCard({ listing, index }: ListingCardProps) {
  const conditionStyle =
    CONDITION_LABELS[listing.condition] ?? CONDITION_LABELS.used;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 200, damping: 25 }}
    >
      <a
        href={listing.vdpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all duration-150 group"
        aria-label={`View ${listing.year} ${listing.make} ${listing.model} at ${listing.dealer.name}`}
        onClick={() => utagLink({ tealium_event: "car_listing_click", car_url: listing.vdpUrl })}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full border",
                  conditionStyle.class
                )}
              >
                {conditionStyle.label}
              </span>
            </div>
            <h3 className="font-semibold text-zinc-100 text-base leading-snug">
              {listing.year} {listing.make} {listing.model} {listing.trim}
            </h3>
            <p className="text-zinc-500 text-xs mt-0.5">{listing.exteriorColor}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-zinc-50 font-bold font-mono text-lg leading-none">
              {listing.price > 0 ? formatPrice(listing.price) : "Call for price"}
            </div>
            <ExternalLink
              size={13}
              className="text-zinc-600 group-hover:text-indigo-400 mt-1.5 ml-auto transition-colors"
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-3 text-xs text-zinc-500">
          {listing.mileage > 0 && (
            <span className="flex items-center gap-1">
              <Gauge size={11} />
              {listing.mileage.toLocaleString()} mi
            </span>
          )}
          {listing.daysOnMarket > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {listing.daysOnMarket}d on lot
            </span>
          )}
          <span className="text-zinc-600">#{listing.stockNumber}</span>
        </div>

        {/* Dealer info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 min-w-0">
            <MapPin size={11} className="flex-shrink-0" />
            <span className="truncate">{listing.dealer.name}</span>
          </div>
          <span className="text-xs text-zinc-600 flex-shrink-0 ml-2">
            {listing.dealer.distance.toFixed(1)} mi away
          </span>
        </div>
      </a>
    </motion.div>
  );
}
