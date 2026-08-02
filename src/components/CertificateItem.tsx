"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, Award } from "lucide-react";

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
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group rounded-xl border border-slate-800 bg-slate-950 font-mono p-4 shadow-lg hover:border-emerald-500/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-emerald-400 font-bold tracking-wider">
              CERT_VALID // SSL_VERIFIED
            </span>
            <h3 className="text-sm font-bold text-slate-100 font-sans truncate max-w-[220px] sm:max-w-xs">
              {certificate.title}
            </h3>
          </div>
        </div>

        <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
          {certificate.year}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <p className="text-[11px] text-slate-400">
          Issuer: <strong className="text-cyan-400">{certificate.issuer}</strong>
        </p>

        {certificate.credentialUrl ? (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:underline"
          >
            Verify Cert <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-[10px] text-slate-500">SIGNED_INTERNAL</span>
        )}
      </div>
    </motion.article>
  );
}

