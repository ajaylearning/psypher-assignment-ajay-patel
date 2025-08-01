"use client";
import { useState, useEffect } from "react";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { UpgradeModal } from "@/components/events/UpgradeModal";
import { EventsGrid } from "@/components/events/EventGrid";
import { EventFilters } from "@/components/events/EventFilters";
import { type Event, type Tier } from "@/lib/supabase/types";

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Tier | "all">("all");

  const currentTier: Tier = (user?.unsafeMetadata?.tier as Tier) || "free";

  useEffect(() => {
    // Only fetch events if the user is signed in
    if (isSignedIn) {
      async function fetchEvents() {
        try {
          setLoading(true);
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
      fetchEvents();
    }
  }, [isSignedIn, activeFilter]);

  const handleLockedEventClick = (eventTier: Tier) => {
    setSelectedTier(eventTier);
    setShowModal(true);
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  // --- LANDING PAGE FOR SIGNED-OUT USERS ---
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-slate-50">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Welcome to the Event Showcase</h1>
        <p className="text-slate-600 mb-8 max-w-md">
          Sign in or create an account to view exclusive events tailored to your membership tier.
        </p>
        <div className="flex items-center gap-4">
          <SignInButton mode="modal">
            <button className="bg-indigo-600 text-white rounded-lg font-medium h-12 px-6 cursor-pointer hover:bg-indigo-700 transition-colors">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-white text-slate-700 border border-slate-300 rounded-lg font-medium h-12 px-6 cursor-pointer hover:bg-slate-100 transition-colors">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </div>
    );
  }

  // --- EVENT BROWSER FOR SIGNED-IN USERS ---
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="relative hidden md:block p-4 sm:p-8 border-r border-slate-200">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4 text-slate-800">Filter by Tier</h2>
            <EventFilters selectedTier={activeFilter} onSelectTier={setActiveFilter} />
          </div>
        </aside>
        <div className="relative">
          <div className="md:hidden sticky top-16 z-40 bg-slate-50/95 backdrop-blur-sm p-4 border-b border-slate-200">
            <EventFilters selectedTier={activeFilter} onSelectTier={setActiveFilter} />
          </div>
          <div className="p-4 sm:p-8">
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
