"use client";

import { motion } from "framer-motion";
import { Terminal, MoonStar, SunMedium, Activity, Database, Server } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [uptime, setUptime] = useState(99.98);
  const [ping, setPing] = useState(14);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    const interval = setInterval(() => {
      setPing(Math.floor(11 + Math.random() * 8));
    }, 4000);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-2 z-50 px-3 sm:top-3 sm:px-6"
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-xl border border-emerald-500/20 bg-slate-950/90 px-3 py-2.5 font-mono shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md sm:px-4"
      >
        {/* Left: Terminal Host / Shell Indicator */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xs font-semibold text-slate-200 transition-colors hover:text-emerald-400 sm:text-sm"
        >
          <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-400 border border-emerald-500/30">
            <Terminal className="h-3.5 w-3.5" />
            <span className="font-bold">ray@backend</span>
          </div>
          <span className="hidden text-slate-500 sm:inline">:~$</span>
        </Link>

        {/* Middle: Live System Status Badges */}
        <div className="hidden items-center gap-3 text-[11px] lg:flex">
          <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-medium text-emerald-400">HTTP 200 OK</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-400">
            <Activity className="h-3 w-3 text-cyan-400" />
            <span>Ping: <strong className="text-cyan-400">{ping}ms</strong></span>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-400">
            <Database className="h-3 w-3 text-amber-400" />
            <span>DB: <strong className="text-slate-200">Neon PG Connected</strong></span>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-400">
            <Server className="h-3 w-3 text-purple-400" />
            <span>Uptime: <strong className="text-purple-300">{uptime}%</strong></span>
          </div>
        </div>

        {/* Right: Quick Links & Theme Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs">
            {[
              ["./about", "#about"],
              ["./projects", "#projects"],
              ["./certs", "#certificates"],
              ["./contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-md border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-slate-400 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400"
              >
                {label}
              </a>
            ))}
          </div>

          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunMedium className="h-4 w-4" />
              ) : (
                <MoonStar className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
