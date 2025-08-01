"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { type Tier } from "@/lib/supabase/types"; 

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade?: (tier: Tier) => void;
  currentTier: Tier;
  requestedTier?: Tier | null ;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  open,
  onClose,
  onUpgrade,
  currentTier,
  requestedTier
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleUpgrade = async () => {
    if (!user || !requestedTier) return;
    setLoading(true);
    await user.update({
      unsafeMetadata: { tier: requestedTier },
    });
    await user.reload();
    setLoading(false);
    onClose();
    onUpgrade?.(requestedTier);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center flex flex-col items-center gap-5">
        <h3 className="text-xl font-bold mb-2">Upgrade Required</h3>
        <p className="mb-2">
          Your current tier is{" "}
          <span className="font-bold">{currentTier.toUpperCase()}</span>.
        </p>
        {requestedTier ? (
          <>
            <p>
              To access this event, upgrade to{" "}
              <span className="font-bold">{requestedTier.toUpperCase()}</span>.
            </p>
            <div className="flex gap-4 justify-center mt-5">
              <button
                className="px-4 py-2 rounded-full bg-gray-300 text-gray-700 font-semibold"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold"
                onClick={handleUpgrade}
                disabled={loading}
              >
                {loading ? "Upgrading..." : "Upgrade"}
              </button>
            </div>
          </>
        ) : (
          <div className="mt-4 text-gray-400 font-semibold">
            You already have the highest tier!
          </div>
        )}
      </div>
    </div>
  );
};