"use client";

import { useState } from "react";
import { addProject } from "@/lib/actions";

export default function AddProjectForm() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;

    const techStackRaw = (
      form.elements.namedItem("techStack") as HTMLInputElement
    ).value;
    const techStack = techStackRaw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    await addProject({
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (
        form.elements.namedItem("description") as HTMLTextAreaElement
      ).value,
      techStack,
      liveUrl:
        (form.elements.namedItem("liveUrl") as HTMLInputElement).value ||
        undefined,
      githubUrl:
        (form.elements.namedItem("githubUrl") as HTMLInputElement).value ||
        undefined,
      imageUrl:
        (form.elements.namedItem("imageUrl") as HTMLInputElement).value ||
        undefined,
    });
    setLoading(false);
    setOpen(false);
    form.reset();
  }

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg text-sm font-medium text-white"
        style={{ background: "var(--accent)" }}
      >
        + Tambah Project
      </button>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-5 border flex flex-col gap-3"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <h2 className="font-medium">Tambah Project Baru</h2>
      <input
        name="title"
        placeholder="Judul project"
        required
        className="px-4 py-2.5 rounded-lg border text-sm"
        style={{
          background: "var(--background)",
          borderColor: "var(--border)",
        }}
      />
      <textarea
        name="description"
        placeholder="Deskripsi"
        required
        rows={3}
        className="px-4 py-2.5 rounded-lg border text-sm resize-none"
        style={{
          background: "var(--background)",
          borderColor: "var(--border)",
        }}
      />
      <div>
        <input
          name="techStack"
          placeholder="Tech stack (pisah pakai koma: Next.js, Tailwind, PostgreSQL)"
          className="px-4 py-2.5 rounded-lg border text-sm w-full"
          style={{
            background: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          contoh: Next.js, Tailwind, PostgreSQL
        </p>
      </div>
      <div>
        <input
          name="imageUrl"
          placeholder="URL gambar (opsional)"
          className="px-4 py-2.5 rounded-lg border text-sm w-full"
          style={{
            background: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          upload gambar dulu ke imgur.com atau cloudinary, paste link-nya di
          sini
        </p>
      </div>
      <input
        name="liveUrl"
        placeholder="Link live (opsional)"
        className="px-4 py-2.5 rounded-lg border text-sm"
        style={{
          background: "var(--background)",
          borderColor: "var(--border)",
        }}
      />
      <input
        name="githubUrl"
        placeholder="Link GitHub (opsional)"
        className="px-4 py-2.5 rounded-lg border text-sm"
        style={{
          background: "var(--background)",
          borderColor: "var(--border)",
        }}
      />
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
  );
}
