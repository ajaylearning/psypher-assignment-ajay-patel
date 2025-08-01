"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Header() {
  const pathname = usePathname();
  // We are on the landing page if the path is exactly "/"
  const isLandingPage = pathname === '/';

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 sm:px-6 lg:px-8 h-16 border-b border-gray-200 bg-white shadow-sm w-full">
      <Link href="/" className="text-md sm:text-lg font-bold text-slate-800 hover:text-indigo-600 transition-colors">
        Psypher Task: Tier-Based Event Showcase
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          {/* Only show the header buttons if we are NOT on the landing page */}
          {!isLandingPage && (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-indigo-600 text-white rounded-lg font-medium text-sm h-10 px-4 cursor-pointer hover:bg-indigo-700 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
