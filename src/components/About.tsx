"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { BriefcaseBusiness, Sparkles } from "lucide-react";

export default function About() {
  const skills = [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "PostgreSQL",
    "Drizzle ORM",
    "Node.js",
    "Git",
  ];

  const experiences = [
    {
      company: "Nama Perusahaan",
      role: "Frontend Developer",
      period: "2023 - sekarang",
      description: "Deskripsi singkat apa yang kamu kerjakan di sini.",
    },
    {
      company: "Nama Perusahaan 2",
      role: "Web Developer Intern",
      period: "2022 - 2023",
      description: "Deskripsi singkat apa yang kamu kerjakan di sini.",
    },
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="about"
      className="relative overflow-hidden rounded-4xl border p-6 sm:p-8 lg:p-10"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--card) 92%, transparent) 0%, color-mix(in srgb, var(--background) 92%, transparent) 100%)",
      }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
        <motion.div variants={childVariants} className="space-y-5">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em]"
            style={{ borderColor: "var(--border)", color: "var(--accent)" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            about me
          </div>

          <div
            className="overflow-hidden rounded-4xl border"
            style={{ borderColor: "var(--border)" }}
          >
            <Image
              src="https://i.imgur.com/7kFwLzt.jpeg"
              alt="Foto profil"
              width={1200}
              height={1200}
              className="h-88 w-full object-cover"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-1">
            {[{ label: "Focus", value: "Web & Mobile Development" }].map(
              (item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border px-4 py-3"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "color-mix(in srgb, var(--card) 76%, transparent)",
                  }}
                >
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em]"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{item.value}</p>
                </div>
              ),
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  background:
                    "color-mix(in srgb, var(--accent) 10%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--accent) 20%, transparent)",
                  color: "var(--accent)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={childVariants} className="space-y-6">
          <div className="space-y-4">
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--muted)" }}
            >
              profile
            </p>
            <h2 className="font-heading text-3xl leading-none sm:text-5xl">
              Membangun antarmuka yang terasa seperti produk, bukan sekadar
              template.
            </h2>
            <p
              className="max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: "var(--muted)" }}
            >
              Tulis bio singkat kamu di sini. Ceritain siapa kamu, passion kamu,
              dan apa yang membuat kamu berbeda. Gaya visual ini sengaja dibuat
              lebih tegas, lebih editorial, dan punya rasa yang mudah diingat.
            </p>
          </div>

          <div
            className="rounded-4xl border p-4 sm:p-5"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 72%, transparent)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                style={{ borderColor: "var(--border)", color: "var(--accent)" }}
              >
                <BriefcaseBusiness className="size-4" />
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-[0.24em]"
                  style={{ color: "var(--muted)" }}
                >
                  experience timeline
                </p>
                <p className="text-sm font-semibold">
                  Perjalanan kerja dan kolaborasi
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {experiences.map((experience) => (
                <div
                  key={`${experience.company}-${experience.role}`}
                  className="relative pl-5"
                >
                  <div className="absolute left-0 top-2 h-full w-px bg-(--border)" />
                  <div
                    className="absolute -left-0.75 top-2 h-2.5 w-2.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold sm:text-base">
                        {experience.role}
                      </h3>
                      <p
                        className="text-xs uppercase tracking-[0.18em]"
                        style={{ color: "var(--accent)" }}
                      >
                        {experience.company}
                      </p>
                    </div>
                    <span
                      className="rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em]"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--muted)",
                      }}
                    >
                      {experience.period}
                    </span>
                  </div>
                  <p
                    className="mt-2 text-sm leading-7"
                    style={{ color: "var(--muted)" }}
                  >
                    {experience.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
