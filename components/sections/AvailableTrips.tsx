"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CalendarDays,
  Check,
  MapPin,
  Plane,
  Tag,
  Users,
} from "lucide-react";
import type { LandingTrip } from "@/lib/types";

interface AvailableTripsProps {
  trips: LandingTrip[];
  /** Cap the number of trips shown (for dashboard summaries). Omit = all. */
  limit?: number;
  /** Show a "Lihat Semua" button linking to /trips (default false). */
  showViewAll?: boolean;
}

function formatPrice(trip: LandingTrip): string {
  if (trip.price === null || trip.price === undefined) {
    return "Hubungi kami";
  }
  const amount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: trip.currency || "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(trip.price);
  return `${amount} / ${trip.priceUnit || "pax"}`;
}

function formatDateRange(trip: LandingTrip): string {
  if (!trip.startDate && !trip.endDate) return "Tanggal menyusul";
  if (trip.startDate && trip.endDate) {
    return `${trip.startDate} → ${trip.endDate}`;
  }
  return trip.startDate || trip.endDate;
}

function TripCard({ trip, index }: { trip: LandingTrip; index: number }) {
  const facilities = trip.facilities.slice(0, 4);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00F0FF]/50 hover:shadow-[0_12px_40px_rgba(0,240,255,0.28)]"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        {trip.coverImage ? (
          <Image
            src={trip.coverImage}
            alt={trip.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Plane className="h-10 w-10 text-zinc-700" />
          </div>
        )}
        {/* gradient scrim for legibility on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#00F0FF] backdrop-blur-md">
          <Tag className="h-3 w-3" />
          {trip.tripType}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#00F0FF]">
            {trip.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <MapPin className="h-4 w-4 text-[#00F0FF]" />
            <span>{trip.destination}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <CalendarDays className="h-4 w-4 text-[#00F0FF]" />
            <span>{formatDateRange(trip)}</span>
          </div>
        </div>

        {trip.shortDescription && (
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {trip.shortDescription}
          </p>
        )}

        {/* Facilities */}
        {facilities.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {facilities.map((facility) => (
              <li
                key={facility}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
              >
                <Check className="h-3 w-3 text-[#00F0FF]" />
                {facility}
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <Users className="h-4 w-4 text-[#00F0FF]" />
            <span>Kuota {trip.quota}</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-500">Mulai dari</p>
            <p className="text-lg font-bold text-[#00F0FF] transition-transform duration-300 group-hover:scale-105">
              {formatPrice(trip)}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-20 text-center backdrop-blur-md">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <Plane className="h-8 w-8 text-[#00F0FF]" />
      </div>
      <h3 className="text-xl font-bold text-white">
        Belum Ada Trip Tersedia
      </h3>
      <p className="mt-2 max-w-md text-sm text-zinc-400">
        Saat ini belum ada perjalanan yang dibuka. Silakan kembali lagi nanti
        atau hubungi kami untuk penawaran private trip.
      </p>
    </div>
  );
}

export default function AvailableTrips({
  trips,
  limit,
  showViewAll = false,
}: AvailableTripsProps) {
  const visibleTrips = limit ? trips.slice(0, limit) : trips;

  return (
    <section id="trips" className="relative bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#00F0FF]">
            Destinasi pilihan
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Trip yang lagi dibuka
          </h2>
          <p className="mt-4 text-zinc-400">
            Slot terbatas. Dari gunung sampai laut — tinggal pilih petualangan
            berikutnya. Semua trip ada jatah ketawa &amp; foto gak jelas.
          </p>
        </motion.div>

        {trips.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleTrips.map((trip, index) => (
                <TripCard key={trip.id} trip={trip} index={index} />
              ))}
            </div>

            {showViewAll && trips.length > (limit ?? 0) && (
              <div className="mt-12 text-center">
                <a
                  href="/trips"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  Lihat Semua Trip
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

