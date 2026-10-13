import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Tapakswaka";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tapakswaka.id";
const SITE_DESCRIPTION =
  "Open trip anak muda bareng komunitas — backpacking, pendakian, dan traveling seru dengan harga transparan dan teman seperjalanan yang jadi keluarga.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Open Trip Anak Muda`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "open trip",
    "open trip anak muda",
    "backpacking",
    "pendakian",
    "traveling bareng",
    "komunitas travel",
    "tour",
    "wisata",
    "Tapakswaka",
    "holiday",
    "liburan",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Open Trip Anak Muda`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Open Trip Anak Muda`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Open Trip Anak Muda`,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

/** JSON-LD structured data — type: TravelAgency (per blueprint). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  image: `${SITE_URL}/og.png`,
  priceRange: "$$",
  telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? undefined,
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Clash Display — display font via Fontshare (for headings). */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}

