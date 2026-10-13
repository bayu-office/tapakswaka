import { getSupabase } from "./supabase";
import { MEDIA_BUCKET, MEDIA_FOLDER } from "./config";
import type {
  ContactInfo,
  Faq,
  MediaItem,
  TeamMember,
  Testimonial,
  Tip,
  WhyUsItem,
} from "./types";

/**
 * Content fetch helpers for the landing page.
 *
 * All functions run server-side and NEVER throw — they degrade to an empty
 * array when the client is unconfigured or the query fails, so each section
 * renders a graceful dark empty state instead of crashing the page.
 */

function noClient(name: string): never[] {
  console.warn(
    `[${name}] Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local`,
  );
  return [];
}

export async function getWhyUs(): Promise<WhyUsItem[]> {
  "use cache";
  const supabase = getSupabase();
  if (!supabase) return noClient("getWhyUs");

  const { data, error } = await supabase
    .from("why_us")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[getWhyUs] failed:", error.message);
    return [];
  }
  return (data ?? []) as WhyUsItem[];
}

export async function getTeams(): Promise<TeamMember[]> {
  "use cache";
  const supabase = getSupabase();
  if (!supabase) return noClient("getTeams");

  const { data, error } = await supabase
    .from("public_teams")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[getTeams] failed:", error.message);
    return [];
  }
  return (data ?? []) as TeamMember[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  const supabase = getSupabase();
  if (!supabase) return noClient("getTestimonials");

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getTestimonials] failed:", error.message);
    return [];
  }
  return (data ?? []) as Testimonial[];
}

export async function getFaqs(): Promise<Faq[]> {
  "use cache";
  const supabase = getSupabase();
  if (!supabase) return noClient("getFaqs");

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[getFaqs] failed:", error.message);
    return [];
  }
  return (data ?? []) as Faq[];
}

export async function getTips(): Promise<Tip[]> {
  "use cache";
  const supabase = getSupabase();
  if (!supabase) return noClient("getTips");

  const { data, error } = await supabase
    .from("tips_tricks")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[getTips] failed:", error.message);
    return [];
  }
  return (data ?? []) as Tip[];
}

export async function getContactInfo(): Promise<ContactInfo[]> {
  "use cache";
  const supabase = getSupabase();
  if (!supabase) return noClient("getContactInfo");

  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[getContactInfo] failed:", error.message);
    return [];
  }
  return (data ?? []) as ContactInfo[];
}

const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif", "svg"]);
const VIDEO_EXTS = new Set(["mp4", "webm", "mov", "m4v"]);

/**
 * Fetch the "Our Family" media gallery straight from the Supabase Storage
 * bucket (no database table needed).
 *
 * Lists files under `MEDIA_FOLDER`, builds a public URL for each, and tags
 * them as image vs video so the UI can render accordingly. Degrades to an
 * empty array when unconfigured / empty / errored.
 */
export async function getMediaGallery(): Promise<MediaItem[]> {
  "use cache";
  const supabase = getSupabase();
  if (!supabase) return noClient("getMediaGallery");

  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .list(MEDIA_FOLDER, { sortBy: { column: "name", order: "asc" } });

  if (error) {
    console.error("[getMediaGallery] failed:", error.message);
    return [];
  }
  if (!data || data.length === 0) return [];

  const items: MediaItem[] = [];

  for (const file of data) {
    // Skip folders — we only surface media files here.
    if (!file.id && !file.name) continue;

    const name = file.name ?? "";
    const dot = name.lastIndexOf(".");
    const ext = dot >= 0 ? name.slice(dot + 1).toLowerCase() : "";
    const isImage = IMAGE_EXTS.has(ext);
    const isVideo = VIDEO_EXTS.has(ext);
    if (!isImage && !isVideo) continue;

    const path = MEDIA_FOLDER ? `${MEDIA_FOLDER}/${name}` : name;
    const { data: publicUrl } = supabase.storage
      .from(MEDIA_BUCKET)
      .getPublicUrl(path);

    items.push({
      name,
      url: publicUrl?.publicUrl ?? "",
      type: ext,
      isImage,
      isVideo,
    });
  }

  return items;
}
