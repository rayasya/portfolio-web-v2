"use client";

import { motion } from "framer-motion";
import { MoonStar, SunMedium } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4 sm:px-6"
    >
      <div
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:px-5"
        style={{
          background: "color-mix(in srgb, var(--background) 82%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] sm:text-base"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border"
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)",
              borderColor: "transparent",
              color: "white",
            }}
          >
            r
          </span>
          <span className="font-heading text-sm tracking-[0.08em] normal-case sm:text-base">
            rayrayaray
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {[
            ["work", "#projects"],
            ["about", "#about"],
            ["contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                color: "var(--muted)",
                borderColor: "var(--border)",
                background: "color-mix(in srgb, var(--card) 72%, transparent)",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">

          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-200 hover:-translate-y-0.5"
              aria-label="Toggle theme"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in srgb, var(--card) 72%, transparent)",
                color: "var(--foreground)",
              }}
            >
              {theme === "dark" ? (
                <SunMedium className="h-4.5 w-4.5" />
              ) : (
                <MoonStar className="h-4.5 w-4.5" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
