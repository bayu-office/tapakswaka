/**
 * Typed shapes matching the public Supabase schema.
 * These mirror the actual column names in the database — no invented fields.
 */

export type TripType = "open" | "private";

export type TripStatus =
  | "draft"
  | "confirmed"
  | "open"
  | "ongoing"
  | "completed"
  | "cancelled";

/** A row from `public.trips` (subset used by the landing page). */
export interface Trip {
  id: string;
  company_id: string;
  trip_code: string | null;
  name: string;
  destination: string;
  trip_type: TripType;
  status: TripStatus;
  start_date: string;
  end_date: string;
  quota: number;
  cover_image: string | null;
  /** Optional columns added via the upgrade script (nullable). */
  short_description?: string | null;
  facilities?: string[] | null;
  highlights?: string[] | null;
  duration_days?: number | null;
  meeting_point?: string | null;
}

/** A row from `public.why_us`. */
export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  display_order: number;
  is_active: boolean;
}

/** A row from `public.public_teams`. */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  /** Optional columns added via the upgrade script (nullable). */
  nickname?: string | null;
  description?: string | null;
}

/** A row from `public.testimonials`. */
export interface Testimonial {
  id: string;
  customer_name: string;
  trip_name: string | null;
  rating: number;
  message: string;
  image_url: string | null;
  is_featured: boolean;
}

/** A row from `public.faqs`. */
export interface Faq {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

/** A row from `public.tips_tricks`. */
export interface Tip {
  id: string;
  title: string;
  content: string;
  category: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
}

/** A row from `public.contact_info`. */
export interface ContactInfo {
  id: string;
  label: string;
  value: string;
  type: "phone" | "email" | "address" | "social" | "map";
  icon: string | null;
  link: string | null;
  display_order: number;
  is_active: boolean;
}

export interface TripPrice {
  id: string;
  trip_id: string;
  name: string;
  amount: number;
  unit: string;
  status: string;
  currency?: string | null;
}

/** A single media file listed from the Supabase Storage "Our Family" bucket. */
export interface MediaItem {
  name: string;
  /** Public URL for the file (signed/unsigned depending on bucket policy). */
  url: string;
  /** Lowercased file extension without the dot, e.g. "jpg", "mp4". */
  type: string;
  /** True when the file is an image (jpg/png/webp/gif/avif). */
  isImage: boolean;
  /** True when the file is a video (mp4/webm/mov). */
  isVideo: boolean;
}

/**
 * A trip enriched with its lowest active price — the shape the
 * `AvailableTrips` section consumes. Always produced by real fetch logic.
 */
export interface LandingTrip {
  id: string;
  name: string;
  destination: string;
  tripType: TripType;
  startDate: string;
  endDate: string;
  quota: number;
  coverImage: string | null;
  facilities: string[];
  shortDescription: string | null;
  durationDays: number | null;
  /** Lowest active price for the trip, if any. */
  price: number | null;
  currency: string;
  priceUnit: string;
}
