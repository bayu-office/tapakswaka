"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Play } from "lucide-react";
import type { MediaItem } from "@/lib/types";

interface OurFamilyProps {
  media: MediaItem[];
}

export default function OurFamily({ media }: OurFamilyProps) {
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
            Our Family
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Momen yang bikin kita jadi satu.
          </h2>
          <p className="mt-4 text-zinc-400">
            Dokumentasi random dari tiap trip — yang asing jadi akrab, yang jaim
            lama-lama ikut goyang.
          </p>
        </motion.div>

        {media.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-20 text-center backdrop-blur-md">
            <Camera className="mb-4 h-10 w-10 text-zinc-700" />
            <p className="text-zinc-400">
              Galeri media akan segera diisi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {media.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: (index % 4) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-zinc-900"
              >
                {item.isImage ? (
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : item.isVideo ? (
                  <video
                    src={item.url}
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : null}

                {item.isVideo && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md">
                      <Play className="h-5 w-5" />
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
