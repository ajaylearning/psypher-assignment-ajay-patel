import React from "react";
import { type Event } from "@/lib/supabase/types";


interface EventCardProps {
  event: Event;
  locked?: boolean;
  onUpgradeClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, locked, onUpgradeClick }) => (
  <div
    className={`relative max-w-xs mx-auto rounded-2xl shadow-lg bg-white overflow-hidden flex flex-col cursor-pointer ${locked ? "opacity-60" : "hover:shadow-xl transition"}`}
    onClick={locked ? onUpgradeClick : undefined}
    style={{ position: "relative" }}
  >
    <img
      src={event.image_url}
      alt={event.title}
      width={400}
      height={200}
      className="w-full h-44 object-cover"
    />
    <div className="p-5 flex flex-col gap-2 flex-1">
      <span className={`self-start text-xs px-3 py-1 rounded-full font-semibold mb-2
        ${
          event.tier === "free"
            ? "bg-gray-200 text-gray-800"
            : event.tier === "silver"
            ? "bg-gray-300 text-gray-900"
            : event.tier === "gold"
            ? "bg-yellow-300 text-yellow-900"
            : "bg-blue-200 text-blue-900"
        }`}>
        {event.tier.toUpperCase()}
      </span>
      <h2 className="text-lg font-bold text-slate-900 mb-1">{event.title}</h2>
      <div className="text-gray-500 text-xs mb-2">
        {new Date(event.event_date).toLocaleString()}
      </div>
      <p className="text-gray-700 text-sm">{event.description}</p>
    </div>
    {locked && (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-2xl pointer-events-none">
        <svg className="w-10 h-10 text-white mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 11V7a5 5 0 00-10 0v4M5 11h14a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" />
        </svg>
        <span className="text-white font-semibold text-sm">Locked - Upgrade to unlock</span>
      </div>
    )}
  </div>
);
