import { getSupabase, getCompanyId } from "./supabase";
import type { LandingTrip, Trip, TripPrice } from "./types";

/** Trip statuses that should be shown publicly on the landing page. */
const PUBLIC_TRIP_STATUSES = ["open", "confirmed"] as const;

function parseDate(value: string): string {
  // Normalize date strings so the client always receives a predictable format.
  if (!value) return "";
  return value.slice(0, 10);
}

function mapTrip(raw: Trip, price: TripPrice | undefined): LandingTrip {
  return {
    id: raw.id,
    name: raw.name,
    destination: raw.destination,
    tripType: raw.trip_type,
    startDate: parseDate(raw.start_date),
    endDate: parseDate(raw.end_date),
    quota: raw.quota ?? 0,
    coverImage: raw.cover_image ?? null,
    facilities: raw.facilities ?? [],
    shortDescription: raw.short_description ?? null,
    durationDays: raw.duration_days ?? null,
    price: price ? Number(price.amount) : null,
    currency: price?.currency ?? "IDR",
    priceUnit: price?.unit ?? "pax",
  };
}

/**
 * Fetch the trips available to the public, enriched with their lowest active price.
 *
 * Runs entirely on the server. Returns an empty array (never throws) when the
 * database has no matching rows, so the UI can render a graceful empty state.
 *
 * - Filters by `company_id` when NEXT_PUBLIC_COMPANY_ID is set (optional).
 * - Only returns trips with a public-facing status (`open` / `confirmed`).
 * - Joins `trip_prices` to attach the cheapest active price.
 */
export async function getAvailableTrips(): Promise<LandingTrip[]> {
  "use cache";
  const supabase = getSupabase();

  // No credentials configured yet — degrade to an empty state instead of crashing.
  if (!supabase) {
    console.warn(
      "[getAvailableTrips] Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
    );
    return [];
  }

  let query = supabase
    .from("trips")
    .select("*")
    .in("status", [...PUBLIC_TRIP_STATUSES])
    .order("start_date", { ascending: true });

  const companyId = getCompanyId();
  if (companyId) {
    query = query.eq("company_id", companyId);
  }

  const { data: trips, error } = await query;

  if (error) {
    // Log server-side but degrade gracefully to an empty state in the UI.
    console.error("[getAvailableTrips] failed to fetch trips:", error.message);
    return [];
  }

  if (!trips || trips.length === 0) {
    return [];
  }

  const tripIds = trips.map((t) => t.id);

  const { data: prices, error: priceError } = await supabase
    .from("trip_prices")
    .select("*")
    .in("trip_id", tripIds)
    .eq("status", "active")
    .order("amount", { ascending: true });

  if (priceError) {
    console.error(
      "[getAvailableTrips] failed to fetch trip prices:",
      priceError.message,
    );
  }

  // Lowest active price per trip (rows are already sorted ascending).
  const cheapestByTrip = new Map<string, TripPrice>();
  for (const p of (prices ?? []) as TripPrice[]) {
    if (!cheapestByTrip.has(p.trip_id)) {
      cheapestByTrip.set(p.trip_id, p);
    }
  }

  return (trips as Trip[]).map((trip) =>
    mapTrip(trip, cheapestByTrip.get(trip.id)),
  );
}
