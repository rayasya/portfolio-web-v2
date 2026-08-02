"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Server, Database, Cpu, Layers, Terminal, Activity, ShieldCheck, GitBranch } from "lucide-react";

export default function About() {
  const backendSkills = [
    {
      category: "Databases & Storage",
      icon: Database,
      items: ["PostgreSQL", "Neon Database", "Redis", "Drizzle ORM", "SQL Optimization"],
      color: "emerald",
    },
    {
      category: "API Architecture & Protocols",
      icon: Layers,
      items: ["RESTful APIs", "gRPC", "GraphQL", "WebSockets", "CORS & Auth"],
      color: "cyan",
    },
    {
      category: "System & Runtime",
      icon: Cpu,
      items: ["Node.js", "TypeScript", "Go", "Python", "Microservices"],
      color: "amber",
    },
    {
      category: "DevOps & Infrastructure",
      icon: Server,
      items: ["Docker", "Linux Administration", "Git / GitHub Actions", "CI/CD Pipelines"],
      color: "purple",
    },
  ];

  const experiences = [
    {
      company: "Tech Systems Studio",
      role: "Backend Engineer",
      period: "2023 - Sekarang",
      description: "Merancang REST API scalable, mengoptimalkan query database PostgreSQL, dan mengimplementasikan sistem caching Redis.",
    },
    {
      company: "Software House Platform",
      role: "Backend Developer Intern",
      period: "2022 - 2023",
      description: "Membantu membuat microservices backend, mengintegrasikan sistem autentikasi JWT/OAuth, dan menyusun dokumentasi Swagger.",
    },
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
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

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="about"
      className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 lg:p-10 font-mono shadow-2xl"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400 font-bold mb-2">
              <Terminal className="h-3.5 w-3.5" />
              SYSTEM_SPECS // PROFILE
            </div>
            <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">
              Arsitektur Backend & Keahlian Sistem
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md font-sans">
            Fokus pada kestabilan server, efisiensi pemrosesan data, struktur relasi database, dan desain API yang bersih & aman.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Column: Profile Card & Terminal Bio */}
          <motion.div variants={childVariants} className="space-y-6">
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-slate-700">
                  <Image
                    src="https://i.imgur.com/7kFwLzt.jpeg"
                    alt="Profil Ray"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="inline-block rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
                    🟢 SYSTEM ONLINE
                  </span>
                  <h3 className="text-lg font-bold text-slate-100">Ray (rayrayaray)</h3>
                  <p className="text-xs text-slate-400">Backend Engineer & Architecture Enthusiast</p>
                  <p className="text-[11px] text-cyan-400">Loc: Indonesia (UTC+7)</p>
                </div>
              </div>
            </div>

            {/* Config JSON Style Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" /> system_philosophy.env
                </span>
                <span className="text-[10px] text-slate-500">READONLY</span>
              </div>
              <ul className="space-y-2 text-slate-300 font-mono text-[11px] leading-relaxed">
                <li><strong className="text-cyan-400">SPEED_FIRST</strong> = true <span className="text-slate-500">// Optimasi query DB & latency rendah</span></li>
                <li><strong className="text-amber-400">CLEAN_API</strong> = true <span className="text-slate-500">// Struktur Endpoint REST yang terstandarisasi</span></li>
                <li><strong className="text-emerald-400">DRY_ARCH</strong> = true <span className="text-slate-500">// Modular, maintainable & easy to scale</span></li>
                <li><strong className="text-purple-400">SECURE_BY_DEFAULT</strong> = true <span className="text-slate-500">// Auth JWT/OAuth & sanitasi input</span></li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Skills Matrix */}
          <motion.div variants={childVariants} className="space-y-6">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              BACKEND TECH STACK & ENGINE MATRIX
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {backendSkills.map((skillGroup) => {
                const Icon = skillGroup.icon;
                return (
                  <div
                    key={skillGroup.category}
                    className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition-colors hover:border-slate-700"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-800 text-emerald-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-200">{skillGroup.category}</h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item) => (
                        <span
                          key={item}
                          className="rounded border border-slate-800 bg-slate-950 px-2 py-0.5 text-[11px] text-slate-300 font-medium hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deployment Experience Logs */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-cyan-400" />
                  WORK & DEPLOYMENT LOGS
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold">2 ENTRIES FOUND</span>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-4 border-l-2 border-slate-800 hover:border-emerald-500 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-bold text-slate-100">{exp.role}</p>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">{exp.period}</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-semibold">{exp.company}</p>
                    <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

