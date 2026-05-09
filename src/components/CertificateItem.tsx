"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, BadgeCheck } from "lucide-react";

export type CertificateData = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string | null;
  type: string | null;
};

type CertificateItemProps = {
  certificate: CertificateData;
  index: number;
};

export default function CertificateItem({
  certificate,
  index,
}: CertificateItemProps) {
  const Icon = certificate.type === "achievement" ? BadgeCheck : Award;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[1.8rem] border p-4 sm:p-5"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--card) 86%, transparent) 0%, color-mix(in srgb, var(--background) 96%, transparent) 100%)",
        boxShadow: "0 14px 36px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-1 bg-[linear-gradient(180deg,var(--accent),var(--accent2))]"
        aria-hidden="true"
      />

      <div className="flex items-start gap-4 pl-2">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
            color: "var(--accent)",
          }}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className="text-[0.68rem] uppercase tracking-[0.28em]"
                style={{ color: "var(--muted)" }}
              >
                certificate
              </p>
              <h3 className="mt-2 truncate font-heading text-lg leading-tight sm:text-xl">
                {certificate.title}
              </h3>
              <p
                className="mt-1 text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--muted)" }}
              >
                {certificate.issuer} · {certificate.year}
              </p>
            </div>

            {certificate.credentialUrl ? (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition-transform duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "var(--border)", color: "var(--accent)" }}
              >
                verify
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span
                className="rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em]"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                archived
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
