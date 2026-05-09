"use client";

import { useState } from "react";
import { updateProject } from "@/lib/actions";

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[] | null;
  liveUrl: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
};

export default function EditProjectForm({ project }: { project: Project }) {
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

    await updateProject(project.id, {
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
        <h2 className="font-medium">Edit Project</h2>
        <input
          name="title"
          defaultValue={project.title}
          placeholder="Judul project"
          required
          className="px-4 py-2.5 rounded-lg border text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        />
        <textarea
          name="description"
          defaultValue={project.description}
          placeholder="Deskripsi"
          required
          rows={3}
          className="px-4 py-2.5 rounded-lg border text-sm resize-none"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        />
        <div>
          <input
            name="techStack"
            defaultValue={project.techStack?.join(", ")}
            placeholder="Tech stack (pisah pakai koma)"
            className="px-4 py-2.5 rounded-lg border text-sm w-full"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          />
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            contoh: Next.js, Tailwind, PostgreSQL
          </p>
        </div>
        <div>
          <input
            name="imageUrl"
            defaultValue={project.imageUrl ?? ""}
            placeholder="URL gambar (opsional)"
            className="px-4 py-2.5 rounded-lg border text-sm w-full"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          />
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            gunakan link langsung dari imgur (i.imgur.com/...)
          </p>
        </div>
        <input
          name="liveUrl"
          defaultValue={project.liveUrl ?? ""}
          placeholder="Link live (opsional)"
          className="px-4 py-2.5 rounded-lg border text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        />
        <input
          name="githubUrl"
          defaultValue={project.githubUrl ?? ""}
          placeholder="Link GitHub (opsional)"
          className="px-4 py-2.5 rounded-lg border text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
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
    </div>
  );
}
