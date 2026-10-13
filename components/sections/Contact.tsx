"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  type LucideIcon,
} from "lucide-react";
import type { ContactInfo } from "@/lib/types";

interface ContactProps {
  contacts: ContactInfo[];
}

/** Minimal TikTok glyph (Lucide has no official TikTok icon). */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

/** Minimal Instagram glyph (Lucide version in use has no Instagram export). */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/** Map a stored icon name to a Lucide icon (fallback: MapPin). */
const ICONS: Record<string, LucideIcon> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  social: Globe,
  map: MapPin,
};

function resolveIcon(type: ContactInfo["type"], name: string | null): LucideIcon {
  if (name && ICONS[name]) return ICONS[name];
  return ICONS[type] ?? MapPin;
}

/** Hardcoded contact channels — always shown regardless of Supabase data. */
const STATIC_CONTACTS: ContactInfo[] = [
  {
    id: "static-address",
    label: "Alamat",
    value:
      "Jl. Singo Joyo Dsn Kemambang RT 7 RW 1 Ds. Sumokembangsri Kec. Balongbendo Kab Sidoarjo",
    type: "address",
    icon: "address",
    link: null,
    display_order: 0,
    is_active: true,
  },
  {
    id: "static-email",
    label: "Email",
    value: "tapakswaka@gmail.com",
    type: "email",
    icon: "email",
    link: "mailto:tapakswaka@gmail.com",
    display_order: 1,
    is_active: true,
  },
  {
    id: "static-tiktok",
    label: "TikTok",
    value: "@tapakswakaholidays",
    type: "social",
    icon: "tiktok",
    link: "https://www.tiktok.com/@tapakswakaholidays",
    display_order: 2,
    is_active: true,
  },
  {
    id: "static-instagram",
    label: "Instagram",
    value: "@tapakswakaholidays",
    type: "social",
    icon: "instagram",
    link: "https://www.instagram.com/tapakswakaholidays",
    display_order: 3,
    is_active: true,
  },
];

export default function Contact({ contacts }: ContactProps) {
  const allContacts = [...STATIC_CONTACTS, ...contacts];

  return (
    <section id="contact" className="relative bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#00F0FF]">
              Kontak
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Kenalan dulu, yuk.
            </h2>
            <p className="mt-4 max-w-md text-zinc-400">
              Masih ragu? Chat dulu, nanya-nanya gratis. Kami jawab sejujur
              mungkin — kecuali ditanya siapa yang paling ganteng di tim.
            </p>

            <div className="mt-8 space-y-4">
              {allContacts.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  Informasi kontak akan segera tersedia.
                </p>
              ) : (
                allContacts.map((c) => {
                  const isTiktok = c.icon === "tiktok";
                  const isInstagram = c.icon === "instagram";
                  const Icon = resolveIcon(c.type, c.icon);
                  const content = (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-[#00F0FF]/40">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#00F0FF]">
                        {isTiktok ? (
                          <TikTokIcon className="h-5 w-5" />
                        ) : isInstagram ? (
                          <InstagramIcon className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wide text-zinc-500">
                          {c.label}
                        </p>
                        <p className="text-sm font-semibold leading-snug text-white">
                          {c.value}
                        </p>
                      </div>
                    </div>
                  );
                  return c.link ? (
                    <a
                      key={c.id}
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={c.id}>{content}</div>
                  );
                })
              )}
            </div>
          </motion.div>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-white">Kirim Pesan</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Kami akan segera membalas pesan Anda.
            </p>
            <form className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Nama
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama lengkap Anda"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#00F0FF]/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                  WhatsApp / Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cara menghubungi Anda"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#00F0FF]/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Pesan
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tulis pesan Anda..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#00F0FF]/50"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#00F0FF] px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:brightness-110"
              >
                Kirim Pesan
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}