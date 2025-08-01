"use client";
import { EventCard } from "./EventCard";
import { type Event, type Tier, tierList } from "@/lib/supabase/types";

interface EventsGridProps {
  events: Event[];
  currentTier: Tier;
  onLockedEventClick: (eventTier: Tier) => void;
}

export const EventsGrid: React.FC<EventsGridProps> = ({ events, currentTier, onLockedEventClick }) => (
  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {events.map(event => {
      const locked = tierList.indexOf(event.tier) > tierList.indexOf(currentTier);
      return (
        <EventCard
          key={event.id}
          event={event}
          locked={locked}
          onUpgradeClick={() => locked && onLockedEventClick(event.tier)}
        />
      );
    })}
  </div>
);