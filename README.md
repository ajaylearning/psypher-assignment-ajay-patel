Psypher Task: Tier-Based Event Showcase
This is a responsive web application built with Next.js that allows logged-in users to view a list of events based on their assigned user tier (Free, Silver, Gold, Platinum). A user can only see events available to their tier or any lower tier. The project features a clean, modern UI with filtering capabilities and a simulation for upgrading user tiers.

Tech Stack
Frontend: Next.js 14 (App Router)

Authentication: Clerk.dev

Database: Supabase (PostgreSQL)

Styling: Tailwind CSS

Deployment: Vercel

Features
Tier-Based Access: Events are conditionally locked or unlocked based on the logged-in user's tier.

Dynamic Filtering: Users can filter the event list by tier in real-time.

Responsive Design: The UI is fully responsive, with a fixed sidebar for filters on desktop and a sticky filter bar on mobile.

Secure Authentication: Clerk handles user sign-up, sign-in, and session management.

Tier Upgrade Simulation: Users can click on a locked event to open a modal and simulate upgrading their tier, which updates their metadata in Clerk.

Optimized Images: Uses next/image for optimized image loading from an external source.

Setup Instructions
Follow these steps to get the project running locally.

1. Clone the Repository
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name

2. Install Dependencies
npm install

3. Set Up Environment Variables
Create a new file named .env.local in the root of your project and add your credentials from Clerk and Supabase.

# Clerk Authentication
# Find these in your Clerk Dashboard -> API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Supabase
# Find these in your Supabase Project Settings -> API
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Set Up the Supabase Database
Create Table: In your Supabase project, create a table named events with the schema defined in the project requirements.

Seed Data: Go to the SQL Editor in your Supabase dashboard and run the SQL script provided in the project to populate the events table with 15 sample records.

5. Run the Development Server
npm run dev

Open http://localhost:3000 with your browser to see the result.

Demo User Credentials
To test the different tier functionalities, you need to create users in your Clerk dashboard and manually set their tier in the User -> Metadata section.

Sign up for a new account in the application.

Go to your Clerk Dashboard -> Users.

Find the new user and scroll down to the Metadata section.

In the Public Metadata field, add the following JSON, replacing "free" with the desired tier:

{
  "tier": "free"
}

Here are some example credentials you can create:

Free Tier User:

Email: ajaypatel52450@gmail.com

Password: 8pJuA6w5|b&O

Metadata: { "tier": "free" }

