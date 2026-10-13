"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/types";

interface FAQProps {
  faqs: Faq[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="relative bg-zinc-950 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#00F0FF]">
            FAQ
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Sering ditanya.
          </h2>
          <p className="mt-4 text-zinc-400">
            Pertanyaan yang paling sering masuk — sisanya tinggal chat aja.
          </p>
        </motion.div>

        {faqs.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center text-zinc-400 backdrop-blur-md">
            Pertanyaan umum akan segera tersedia.
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-300 hover:border-[#00F0FF]/30 ${
                    isOpen
                      ? "border-[#00F0FF]/40 bg-white/5"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-[#00F0FF] transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
