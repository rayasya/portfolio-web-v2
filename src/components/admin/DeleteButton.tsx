"use client";

import { deleteProject, deleteCertificate } from "@/lib/actions";

export default function DeleteButton({
  id,
  type,
}: {
  id: number;
  type: "project" | "certificate";
}) {
  async function handleDelete() {
    if (!confirm("Yakin mau hapus?")) return;
    if (type === "project") await deleteProject(id);
    if (type === "certificate") await deleteCertificate(id);
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs px-3 py-1.5 rounded-lg border"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
    >
      hapus
    </button>
  );
}
