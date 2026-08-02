"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Server, FileText, Download, ShieldCheck, Database } from "lucide-react";
import TerminalCLI from "@/components/TerminalCLI";

type HeroProps = {
  name: string;
  role: string;
  tagline: string;
};

export default function Hero({ name, role, tagline }: HeroProps) {
  const shellVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="home"
      className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 lg:p-10 shadow-2xl"
      variants={shellVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Dark Grid Background Effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40"
      />

      <div className="relative z-10 space-y-8">
        {/* Top Header Badge & Role Intro */}
        <div className="space-y-4 max-w-3xl">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <Server className="h-3.5 w-3.5" />
            Backend System Architect & API Engineer
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-mono text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-100"
          >
            Halo, aku <span className="text-emerald-400">Ray</span>.
            <span className="block text-2xl sm:text-3xl lg:text-4xl text-cyan-400 mt-2">
              Backend Developer
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base text-slate-300 sm:text-lg leading-relaxed font-sans"
          >
            Aku berfokus pada perancangan arsitektur server, RESTful/gRPC API, pemodelan database relational (PostgreSQL/NeonDB), query optimization, serta pengolahan sistem yang scalable & teruji aman.
          </motion.p>

          {/* Download & Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <Database className="h-4 w-4" />
              Lihat Proyek & API
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 font-semibold text-slate-200 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
            >
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              Hubungi Server
            </a>

            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-slate-100"
            >
              <Download className="h-3.5 w-3.5 text-amber-400" />
              Download CV
            </a>

            <a
              href="/portfolio.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-slate-100"
            >
              <FileText className="h-3.5 w-3.5 text-purple-400" />
              Download Portfolio
            </a>
          </motion.div>
        </div>

        {/* Interactive Terminal CLI Window */}
        <motion.div variants={itemVariants} className="pt-4">
          <TerminalCLI />
        </motion.div>
      </div>
    </motion.section>
  );
}

