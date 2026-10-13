import type { NextConfig } from "next";

/**
 * Whitelist the Supabase project hostname for next/image optimization.
 * The hostname is derived dynamically from NEXT_PUBLIC_SUPABASE_URL so it
 * "just works" once the environment variable is filled in. If the variable
 * is not yet set, we fall back to a permissive supabase.co pattern so the
 * config stays valid during scaffolding.
 */
function supabaseHostname(): string | undefined {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

const hostname = supabaseHostname();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Explicitly whitelist the configured Supabase project domain.
      ...(hostname ? [{ protocol: "https" as const, hostname }] : []),
      // Fallback: allow any subdomain of supabase.co during scaffolding.
      { protocol: "https" as const, hostname: "*.supabase.co" },
      // Placeholder images for team photos (replace with real URLs later).
      { protocol: "https" as const, hostname: "picsum.photos" },
      // Unsplash — direct image CDN + page host.
      { protocol: "https" as const, hostname: "images.unsplash.com" },
      { protocol: "https" as const, hostname: "unsplash.com" },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

