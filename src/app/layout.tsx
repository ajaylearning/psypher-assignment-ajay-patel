import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import Header from '@/components/layout/header'; 
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
          {/* Use the new Header component */}
          <Header />

          {/* Main content will be either the landing page or the event browser */}
          <div className="flex-grow">
            {children}
          </div>

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
