"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Trip", href: "/trips" },
  { label: "Tim Kami", href: "/teams" },
  { label: "Tips", href: "/tips" },
  { label: "Kontak", href: "/contact" },
];

// Client-only year: reads current year on the client, stable snapshot on the
// server so it does not block static prerendering.
const subscribe = () => () => {};
const getYear = () => String(new Date().getFullYear());
const getServerYear = () => "";

export default function Footer() {
  const year = useSyncExternalStore(subscribe, getYear, getServerYear);

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
            <span className="font-display text-sm font-semibold tracking-tight text-white">
              Tapakswaka<span className="text-[#00F0FF]">.</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500" suppressHydrationWarning>
            © {year} Tapakswaka. Trip bersama tim anomali — ketawa terus,
            bahagia terus.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-1">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
