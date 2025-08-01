import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Psypher Task: Tier-Based Event Showcase',
  description: 'Exclusive events for members, developed by Ajay Patel.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-slate-50`}>
          {/* --- HEADER --- */}
          {/* Added sticky positioning and responsive padding */}
          <header className="sticky top-0 z-50 flex justify-between items-center p-4 sm:px-6 lg:px-8 h-16 border-b border-gray-200 bg-white shadow-sm w-full">
            {/* Made the title a link to the homepage */}
            <a href="/" className="text-md sm:text-lg font-bold text-slate-800 hover:text-indigo-600 transition-colors">
              Psypher Task: Tier-Based Event Showcase
            </a>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-indigo-600 text-white rounded-lg font-medium text-sm h-10 px-4 cursor-pointer hover:bg-indigo-700 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-grow">
            {children}
          </main>

          {/* --- FOOTER --- */}
          <footer className="w-full bg-white border-t border-gray-200 p-4 text-center">
            <p className="text-sm text-slate-600">
              Developed by Ajay Patel | <a href="mailto:ajaypatel4166@gmail.com" className="text-indigo-600 hover:underline">ajaypatel4166@gmail.com</a>
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
