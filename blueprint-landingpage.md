# PROJECT BLUEPRINT: TAPAKSWAKA HOLIDAYS LANDING PAGE (Folder: `tpsk`)

## 1. TECH STACK & ENVIRONMENT
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Database & Storage: Supabase
- Architecture: Monorepo setup. You are strictly working inside the `tpsk` directory for the landing page.

## 2. STRICT RULES (CRITICAL)
- NO DUMMY DATA: All content (Trips, Teams, Testimonials, FAQ) MUST be fetched directly from Supabase using Server Components. Do not hardcode any content arrays.
- SEO FIRST: Implement strict SEO in `app/layout.tsx` using Next.js Metadata API, Open Graph (1200x630px standard), and JSON-LD schema (type: TravelAgency).
- DESIGN SYSTEM: Modern aesthetic. Primary background is Deep Black/Zinc. Accent color is Neon Tosca (#00F0FF) used for buttons, borders, active states, and subtle Framer Motion glows.
- COMPONENT PATTERN: Fetch data in Server Components (`page.tsx`). Pass data as props to Client Components (`"use client"`) which are strictly used ONLY for Framer Motion animations and user interactivity.

## 3. CORE FILES TO INITIALIZE
1. `next.config.js`: Configure `remotePatterns` to explicitly whitelist the Supabase project domain for Next.js `<Image />` optimization.
2. `lib/supabase.ts` (or equivalent): Set up the Supabase client for Server-side fetching.
3. `app/layout.tsx`: Global layout, SEO metadata, JSON-LD injection, and base Tailwind background classes.
4. `app/page.tsx`: The main Server Component orchestrating the data fetch and rendering the sections below.

## 4. LANDING PAGE SECTIONS (UI/UX STRUCTURE)
Create modular components for each section:
1. `Hero` & `WhyUs`: Bold typography, dark backdrop, Neon Tosca CTA button, subtle Framer Motion fade-in.
2. `AvailableTrips`: Grid layout cards. Images fetched from Supabase bucket. Must display price and facilities. Use staggered Framer Motion reveal on scroll.
3. `OurTeams`: Minimalist profile cards with Framer Motion hover effects (slight scale and neon glow).
4. `Testimonials`: Clean card layout or simple CSS scroll snap carousel.
5. `FAQ`: Minimalist interactive accordion.
6. `TipsTricks`: Clean list or grid layout.
7. `Contact`: Simple form UI and contact information mapping.

## 5. EXECUTION INSTRUCTIONS FOR CLINE
- Step 1: Scaffold `next.config.js`, `app/layout.tsx`, and the Supabase utility file.
- Step 2: Create the component folder structure (`components/sections/`).
- Step 3: Build the skeletal structure of `app/page.tsx` and the section components.
- Step 4: PAUSE and ask the user to provide the exact Supabase table schemas (trips, teams, faq) before writing the specific data fetching logic.

## 6. DESIGN SYSTEM & UI/UX GUIDELINES (STRICT)
- COLOR PALETTE:
  - Background: Pure Black (`#000000`) and Dark Zinc (`#09090B` or `#18181B`) for depth and card backgrounds.
  - Accent/Primary: Neon Tosca (`#00F0FF`). Use this strictly for CTA buttons, active states, glowing shadows, and subtle borders.
  - Text: Pure White (`#FFFFFF`) for headings, Light Gray (`#A1A1AA`) for body text/subtitles to maintain contrast without hurting the eyes.
- TYPOGRAPHY: Use a modern, clean Sans-Serif font (e.g., Plus Jakarta Sans or Inter). Headings must be bold and tightly tracked; body text must be highly legible.
- UI ELEMENTS: 
  - Cards & Containers: Minimalist with 1px subtle borders (e.g., `border-white/10` or `border-[#00F0FF]/20` on hover). Apply rounded corners (`rounded-2xl`).
  - Glassmorphism: Use subtle backdrop blur (`backdrop-blur-md`, `bg-black/50`) for sticky navbars or floating elements.
- UX & INTERACTIONS:
  - Buttons: Must have a subtle Neon Tosca glow effect on hover using Tailwind shadow (`hover:shadow-[0_0_15px_#00F0FF]`).
  - Scroll & Reveal: Elements should not just appear; they must gracefully fade and slide up using Framer Motion when scrolling into view.