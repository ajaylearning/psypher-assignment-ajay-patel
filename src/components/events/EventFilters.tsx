"use client";

import { type Tier, tierList } from "@/lib/supabase/types";

interface EventFiltersProps {
  selectedTier: Tier | "all";
  onSelectTier: (tier: Tier | "all") => void;
}

const allTiers: (Tier | "all")[] = ["all", ...tierList];

export const EventFilters: React.FC<EventFiltersProps> = ({ selectedTier, onSelectTier }) => {
  return (
    <div className="flex md:flex-col items-start gap-2 w-full overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
      {allTiers.map((tier) => (
        <button
          key={tier}
          onClick={() => onSelectTier(tier)}
          // Updated styles for a sidebar layout on desktop
          className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap md:whitespace-normal ${
            selectedTier === tier
              ? "bg-indigo-600 text-white shadow"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </button>
      ))}
    </div>
  );
};
