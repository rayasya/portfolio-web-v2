"use client";

import { useState } from "react";
import { updateCertificate } from "@/lib/actions";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string | null;
  type: string | null;
};

export default function EditCertificateForm({
  certificate,
}: {
  certificate: Certificate;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;

    await updateCertificate(certificate.id, {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      issuer: (form.elements.namedItem("issuer") as HTMLInputElement).value,
      year: (form.elements.namedItem("year") as HTMLInputElement).value,
      credentialUrl:
        (form.elements.namedItem("credentialUrl") as HTMLInputElement).value ||
        undefined,
      type: (form.elements.namedItem("type") as HTMLSelectElement).value,
    });
    setLoading(false);
    setOpen(false);
  }

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs px-3 py-1.5 rounded-lg border"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        edit
      </button>
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-xl p-5 border flex flex-col gap-3 w-full max-w-md mx-4"
        style={{
          background: "var(--background)",
          borderColor: "var(--border)",
        }}
      >
        <h2 className="font-medium">Edit Sertifikat</h2>
        <input
          name="title"
          defaultValue={certificate.title}
          placeholder="Nama sertifikat / pencapaian"
          required
          className="px-4 py-2.5 rounded-lg border text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        />
        <input
          name="issuer"
          defaultValue={certificate.issuer}
          placeholder="Issuer (misal: Coursera, Google)"
          required
          className="px-4 py-2.5 rounded-lg border text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        />
        <input
          name="year"
          defaultValue={certificate.year}
          placeholder="Tahun (misal: 2024)"
          required
          className="px-4 py-2.5 rounded-lg border text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        />
        <input
          name="credentialUrl"
          defaultValue={certificate.credentialUrl ?? ""}
          placeholder="Link credential (opsional)"
          className="px-4 py-2.5 rounded-lg border text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        />
        <select
          name="type"
          defaultValue={certificate.type ?? "certificate"}
          className="px-4 py-2.5 rounded-lg border text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <option value="certificate">📜 Certificate</option>
          <option value="achievement">🏆 Achievement</option>
        </select>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-60"
            style={{ background: "var(--accent)" }}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg text-sm border"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
