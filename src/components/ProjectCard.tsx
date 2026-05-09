"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Computer } from "lucide-react";
import Image from "next/image";

export type ProjectData = {
  id: number;
  title: string;
  description: string;
  techStack: string[] | null;
  liveUrl: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  featured: boolean | null;
};

type ProjectCardProps = {
  project: ProjectData;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{ y: -10, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
      className="group relative overflow-hidden rounded-[2rem] border"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--card) 88%, transparent) 0%, color-mix(in srgb, var(--background) 94%, transparent) 100%)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,var(--accent),var(--accent2))]" />

      <div className="relative overflow-hidden">
        {project.imageUrl ? (
          <div className="relative h-64 overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div
            className="flex h-64 items-center justify-center p-6"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, transparent) 0%, color-mix(in srgb, var(--accent2) 12%, transparent) 100%)",
            }}
          >
            <div
              className="max-w-xs rounded-[1.4rem] border p-4 text-center"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in srgb, var(--background) 74%, transparent)",
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.28em]"
                style={{ color: "var(--muted)" }}
              >
                preview missing
              </p>
              <p className="mt-2 text-sm font-semibold">
                Tambahkan image untuk memberi konteks visual yang lebih kuat.
              </p>
            </div>
          </div>
        )}

        {project.featured && (
          <span
            className="absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em]"
            style={{
              borderColor:
                "color-mix(in srgb, var(--accent2) 30%, transparent)",
              background: "color-mix(in srgb, var(--accent2) 12%, transparent)",
              color: "var(--accent2)",
            }}
          >
            featured
          </span>
        )}
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[0.68rem] uppercase tracking-[0.28em]"
              style={{ color: "var(--muted)" }}
            >
              selected project
            </p>
            <h3 className="mt-2 font-heading text-2xl leading-tight">
              {project.title}
            </h3>
          </div>
          <div
            className="rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em]"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--accent) 18%, transparent)",
                background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                color: "var(--accent)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              live site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              github
              <Computer className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
