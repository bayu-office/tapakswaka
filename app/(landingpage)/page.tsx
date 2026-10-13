import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import AvailableTrips from "@/components/sections/AvailableTrips";
import Testimonials from "@/components/sections/Testimonials";
import OurFamily from "@/components/sections/OurFamily";
import FAQ from "@/components/sections/FAQ";

import { getAvailableTrips } from "@/lib/trips";
import {
  getWhyUs,
  getTestimonials,
  getFaqs,
  getMediaGallery,
} from "@/lib/content";

/**
 * Dashboard ("/") — the landing home page.
 *
 * Overview sections only. Each has a dedicated detail page:
 *   - trips  → /trips (full list + pricing/facilities)
 *   - teams  → /teams
 *   - tips   → /tips
 *   - contact → /contact
 */
export default async function LandingPage() {
  const [trips, whyUs, testimonials, faqs, media] = await Promise.all([
    getAvailableTrips(),
    getWhyUs(),
    getTestimonials(),
    getFaqs(),
    getMediaGallery(),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <WhyUs items={whyUs} />
      <AvailableTrips trips={trips} limit={3} showViewAll />
      <Testimonials testimonials={testimonials} />
      <OurFamily media={media} />
      <FAQ faqs={faqs} />
    </main>
  );
}

