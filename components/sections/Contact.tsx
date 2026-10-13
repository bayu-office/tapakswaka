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

export default function Contact({ contacts }: ContactProps) {
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
              {contacts.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  Informasi kontak akan segera tersedia.
                </p>
              ) : (
                contacts.map((c) => {
                  const Icon = resolveIcon(c.type, c.icon);
                  const content = (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-[#00F0FF]/40">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#00F0FF]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-zinc-500">
                          {c.label}
                        </p>
                        <p className="truncate text-sm font-semibold text-white">
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
