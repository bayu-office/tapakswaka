import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Server-side Supabase client (Singleton).
 *
 * Returns `null` when credentials are missing so the app can still render its
 * graceful empty states during scaffolding — instead of crashing the build.
 * The fetch helpers log a clear warning so the missing config is obvious.
 */
/**
 * True when a value is a real config (not an empty/placeholder string).
 * Placeholders like "your-project.supabase.co" or "YOUR_ANON_KEY" are treated
 * as unconfigured so we gracefully degrade instead of failing the build.
 */
function isConfigured(value: string | undefined): boolean {
  if (!value) return false;
  const v = value.trim();
  if (v.length === 0) return false;
  if (v.includes("your-project") || v.includes("your-anon-key")) return false;
  if (v === "YOUR_ANON_KEY" || v.startsWith("YOUR_")) return false;
  return true;
}

function createSupabaseClient(): SupabaseClient | null {
  if (!isConfigured(supabaseUrl) || !isConfigured(supabaseAnonKey)) {
    return null;
  }
  return createClient(supabaseUrl!, supabaseAnonKey!);
}

// Lazily create the client only when first needed (keeps cold start cheap).
let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client === undefined) {
    client = createSupabaseClient();
  }
  return client;
}

/** Optional company id used to scope public content (may be empty). */
export function getCompanyId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_COMPANY_ID;
  return id && id.trim().length > 0 ? id.trim() : undefined;
}
