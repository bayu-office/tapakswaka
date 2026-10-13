"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import type { Tip } from "@/lib/types";

interface TipsTricksProps {
  tips: Tip[];
}

export default function TipsTricks({ tips }: TipsTricksProps) {
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
            Tips &amp; Trik
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Bekal sebelum berangkat.
          </h2>
          <p className="mt-4 text-zinc-400">
            Hal-hal kecil yang bikin trip kamu jauh lebih lancar.
          </p>
        </motion.div>

        {tips.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center text-zinc-400 backdrop-blur-md">
            Tips perjalanan akan segera hadir.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip, index) => (
              <motion.article
                key={tip.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-[#00F0FF] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  {tip.category && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#00F0FF]">
                      {tip.category}
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {tip.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {tip.content}
                </p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
