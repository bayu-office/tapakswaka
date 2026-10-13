"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* Neon Tosca glow backdrop — radial gradient behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00F0FF]/20 via-black to-black" />
        {/* Soft secondary bloom */}
        <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00F0FF]/5 blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center"
      >
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-zinc-300 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#00F0FF]" />
          TRIP BARENG TIM ANOMALI
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]"
        >
          Jalan bareng,
          <br />
          pulang jadi
          <br />
          <span className="bg-gradient-to-r from-[#00F0FF] via-[#7CF7FF] to-[#00F0FF] bg-clip-text text-transparent">
            KELUARGA ANOMALI.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Berangkat sendiri, sampai jadi bagian dari sesuatu. Yang serius cuma
          rute &amp; akomodasinya — sisanya kita jamin banyak Bahagia, foto-foto
          gak jelas, dan teman baru yang resek tapi sayang banget.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="/trips"
            className="group relative inline-flex items-center gap-2 rounded-full bg-[#00F0FF] px-8 py-4 text-sm font-bold tracking-wide text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:brightness-110"
          >
            Lihat trip
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:border-[#00F0FF]/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            Ikut tim anomali
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
