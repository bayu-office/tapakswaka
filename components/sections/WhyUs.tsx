"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Users,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { WhyUsItem } from "@/lib/types";

interface WhyUsProps {
  items: WhyUsItem[];
}

/** Map a stored icon name to a Lucide icon (fallback: ShieldCheck). */
const ICONS: Record<string, LucideIcon> = {
  wallet: Wallet,
  users: Users,
  "shield-check": ShieldCheck,
};

function resolveIcon(name: string | null): LucideIcon {
  if (name && ICONS[name]) return ICONS[name];
  return ShieldCheck;
}

export default function WhyUs({ items }: WhyUsProps) {
  return (
    <section className="relative bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#00F0FF]">
            Kenapa bareng kami
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Bukan sekadar jalan-jalan.
          </h2>
          <p className="mt-4 text-zinc-400">
            Yang bikin trip beda bukan destinasi, tapi siapa yang jalan bareng
            kamu — di sini, Bahagia adalah fasilitas wajib.
          </p>
        </motion.div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center text-zinc-400 backdrop-blur-md">
            Keunggulan kami akan segera hadir.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const Icon = resolveIcon(item.icon);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#00F0FF] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
