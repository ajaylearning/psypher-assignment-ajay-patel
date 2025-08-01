"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { UpgradeModal } from "@/components/events/UpgradeModal";
import { EventsGrid } from "@/components/events/EventGrid";
import { type Event, type Tier } from "@/lib/supabase/types";

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentTier: Tier = (user?.unsafeMetadata?.tier as Tier) || "free";

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error('Failed to fetch events');
        const json = await res.json();
        if (json.success) {
          setEvents(json.data);
        } else {
          throw new Error(json.error || 'An unknown error occurred');
        }
      } catch (err) { // Changed 'err: any' to just 'err'
        // Type assertion to treat err as an Error object
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
  }, [isSignedIn]);

  const handleLockedEventClick = (eventTier: Tier) => {
    setSelectedTier(eventTier);
    setShowModal(true);
  };

  if (!isLoaded || (isSignedIn && loading)) {
    return <div className="p-6 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }
  if (!isSignedIn) {
     return <div className="p-6 text-center">Please sign in to view events.</div>;
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <EventsGrid
          events={events}
          currentTier={currentTier}
          onLockedEventClick={handleLockedEventClick}
        />
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
