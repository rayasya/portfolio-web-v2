"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Code2, Terminal, CheckCircle } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"overview" | "curl" | "json">("overview");

  const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const curlSnippet = `curl -X GET "https://api.raydev.io/v1/projects/${slug}" \\\n  -H "Authorization: Bearer dev_token_ok"`;

  const jsonSnippet = JSON.stringify(
    {
      status: 200,
      service: project.title,
      techStack: project.techStack || ["Node.js", "PostgreSQL"],
      isFeatured: Boolean(project.featured),
      liveUrl: project.liveUrl,
    },
    null,
    2
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-mono shadow-sm dark:shadow-xl overflow-hidden flex flex-col justify-between"
    >
      {/* Top API Method Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/90 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 font-bold text-emerald-600 dark:text-emerald-400">
            GET
          </span>
          <span className="text-slate-700 dark:text-slate-300 font-semibold text-[11px] truncate max-w-[200px] sm:max-w-none">
            /api/v1/projects/{slug}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded bg-slate-200 dark:bg-slate-800 px-2 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle className="h-3 w-3" /> 200 OK
          </span>
          <span className="text-[10px] text-slate-500 font-sans">{(12 + index * 4)}ms</span>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 px-4 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-3 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "overview"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("curl")}
          className={`px-3 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "curl"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          cURL Snippet
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("json")}
          className={`px-3 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "json"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          Response JSON
        </button>
      </div>


      {/* Main Tab Content */}
      <div className="p-5 space-y-4 flex-1">
        {activeTab === "overview" && (
          <div className="space-y-4">
            {project.imageUrl && (
              <div className="relative h-44 w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-100 font-sans">{project.title}</h3>
                {project.featured && (
                  <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                    FEATURED
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-300 font-sans leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        )}

        {activeTab === "curl" && (
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-cyan-300 font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>BASH TERMINAL</span>
              <span>cURL</span>
            </div>
            <pre className="whitespace-pre-wrap overflow-x-auto text-[11px] leading-relaxed text-slate-200">
              {curlSnippet}
            </pre>
          </div>
        )}

        {activeTab === "json" && (
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-500 text-[10px] mb-1">
              <span>APPLICATION/JSON</span>
              <span className="text-emerald-400">VALID</span>
            </div>
            <pre className="whitespace-pre-wrap text-[11px] text-amber-300 leading-relaxed">
              {jsonSnippet}
            </pre>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="rounded border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-emerald-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="border-t border-slate-800/80 bg-slate-900/50 p-3 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded border border-slate-800 bg-slate-900 px-3 py-1.5 font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            >
              <GitBranch className="h-3.5 w-3.5" />
              Repository
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded bg-emerald-500 px-3 py-1.5 font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Endpoint
            </a>
          )}
        </div>
        <span className="text-[10px] text-slate-500">ID: #{project.id}</span>
      </div>
    </motion.article>
  );
}

