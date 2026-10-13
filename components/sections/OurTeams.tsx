"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, Camera, Video, MapPin, Calculator } from "lucide-react";
import type { TeamMember } from "@/lib/types";

interface OurTeamsProps {
  members: TeamMember[];
}

function roleIcon(role: string) {
  const r = role.toLowerCase();
  if (r.includes("video")) return Video;
  if (r.includes("photo")) return Camera;
  if (r.includes("finance")) return Calculator;
  if (r.includes("tour") || r.includes("oper")) return MapPin;
  return User;
}

export default function OurTeams({ members }: OurTeamsProps) {
  return (
    <section id="teams" className="relative bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#00F0FF]">
            Meet Our Team
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The{" "}
            <span className="text-[#00F0FF] drop-shadow-[0_0_12px_rgba(0,240,255,0.45)]">
              CLOWNS
            </span>
            .
          </h2>
          <p className="mt-4 text-zinc-400">
            Kelihatan kayak sekumpulan pelawak berkedok tour guide, tapi kalau
            udah urusan eksekusi trip, kita kerja layaknya tactical strike
            team.
          </p>
        </motion.div>

        {members.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center text-zinc-400 backdrop-blur-md">
            Tim kami akan segera diperkenalkan.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member, index) => {
              const Icon = roleIcon(member.role);
              return (
                <motion.article
                  key={member.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00F0FF]/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]"
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950">
                        <Icon className="h-16 w-16 text-zinc-700 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#00F0FF]" />
                      </div>
                    )}

                    {/* Role chip */}
                    <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-200 backdrop-blur-md">
                      {member.role}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-sm">
                      <span className="italic text-zinc-400">aka </span>
                      <span className="font-bold text-[#00F0FF]">
                        {member.nickname ?? member.role}
                      </span>
                    </p>
                    {member.description && (
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {member.description}
                      </p>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}