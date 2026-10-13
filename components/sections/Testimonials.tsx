"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star, User } from "lucide-react";
import type { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-[#00F0FF] text-[#00F0FF]" : "text-zinc-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
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
            Testimoni
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Dari orang yang udah Muak dengan kami.
          </h2>
          <p className="mt-4 text-zinc-400">
            Cerita nyata dari mereka yang berangkat sendiri, pulang bawa teman
            baru (dan ratusan foto candid muka aneh).
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center text-zinc-400 backdrop-blur-md">
            Belum ada testimoni. Jadilah yang pertama!
          </div>
        ) : (
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t, index) => (
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] sm:w-[420px]"
              >
                <Quote className="mb-4 h-8 w-8 text-[#00F0FF]/60 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#00F0FF]" />
                <p className="flex-1 text-sm leading-relaxed text-zinc-300">
                  &ldquo;{t.message}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10 bg-zinc-900">
                    {t.image_url ? (
                      <Image
                        src={t.image_url}
                        alt={t.customer_name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <User className="h-5 w-5 text-zinc-700" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Stars rating={t.rating} />
                    <p className="mt-1 text-sm font-bold text-white">
                      {t.customer_name}
                    </p>
                    {t.trip_name && (
                      <p className="text-xs text-zinc-500">{t.trip_name}</p>
                    )}
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
