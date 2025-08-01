"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { UpgradeModal } from "@/components/events/UpgradeModal";
import { EventsGrid } from "@/components/events/EventGrid";
import { EventFilters } from "@/components/events/EventFilters"; // Import the new component
import { type Event, type Tier } from "@/lib/supabase/types";

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Tier | "all">("all"); // State for the filter

  const currentTier: Tier = (user?.unsafeMetadata?.tier as Tier) || "free";

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        // Pass the active filter to the API
        const res = await fetch(`/api/events?tier=${activeFilter}`);
        if (!res.ok) throw new Error('Failed to fetch events');
        const json = await res.json();
        if (json.success) {
          setEvents(json.data);
        } else {
          throw new Error(json.error || 'An unknown error occurred');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
    if (isSignedIn) {
      fetchEvents();
    }
  }, [isSignedIn, activeFilter]); // Re-fetch when the filter changes

  const handleLockedEventClick = (eventTier: Tier) => {
    setSelectedTier(eventTier);
    setShowModal(true);
  };

  if (!isLoaded) {
    return <div className="p-6 text-center">Loading...</div>;
  }
  if (!isSignedIn) {
     return <div className="p-6 text-center">Please sign in to view events.</div>;
  }

  return (
    <>
      {/* Main layout changed to a responsive grid */}
      <main className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 sm:p-8">
        {/* Sidebar for filters */}
        <aside className="relative hidden md:block">
          <div className="sticky top-24"> {/* Adjust top value based on header height */}
            <h2 className="text-lg font-semibold mb-4 text-slate-800">Filter by Tier</h2>
            <EventFilters selectedTier={activeFilter} onSelectTier={setActiveFilter} />
          </div>
        </aside>

        {/* Main content area */}
        <div>
          {/* Filters for mobile view */}
          <div className="md:hidden sticky top-16 z-40 bg-slate-50/95 backdrop-blur-sm p-4 border-b border-slate-200">
            <EventFilters selectedTier={activeFilter} onSelectTier={setActiveFilter} />
          </div>
          
          {loading ? (
            <div className="text-center pt-16">Loading events...</div>
          ) : error ? (
            <div className="text-center pt-16 text-red-500">Error: {error}</div>
          ) : (
            <EventsGrid
              events={events}
              currentTier={currentTier}
              onLockedEventClick={handleLockedEventClick}
            />
          )}
        </div>

        <UpgradeModal
          open={showModal}
          onClose={() => setShowModal(false)}
          currentTier={currentTier}
          requestedTier={selectedTier}
        />
      </main>
    </>
  );
}
