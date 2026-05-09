"use client";

import { useState } from "react";
import { addContact } from "@/lib/actions";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };
    await addContact(data);
    setSent(true);
    setLoading(false);
    form.reset();
  }

  return (
    <div
      className="rounded-xl p-6 border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {sent ? (
        <div className="text-center py-8">
          <p className="text-2xl mb-2">🎉</p>
          <p className="font-medium">Pesan terkirim!</p>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Aku akan balas secepatnya.
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-sm mt-4 underline"
            style={{ color: "var(--accent)" }}
          >
            Kirim pesan lain
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Punya project seru atau mau kolaborasi? Kirim pesan!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              name="name"
              type="text"
              placeholder="Nama kamu"
              required
              className="px-4 py-2.5 rounded-lg border text-sm w-full"
              style={{
                background: "var(--background)",
                borderColor: "var(--border)",
              }}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="px-4 py-2.5 rounded-lg border text-sm w-full"
              style={{
                background: "var(--background)",
                borderColor: "var(--border)",
              }}
            />
            <textarea
              name="message"
              placeholder="Isi pesan..."
              rows={4}
              required
              className="px-4 py-2.5 rounded-lg border text-sm w-full resize-none"
              style={{
                background: "var(--background)",
                borderColor: "var(--border)",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 rounded-lg text-sm font-medium text-white disabled:opacity-60"
              style={{ background: "var(--accent)" }}
            >
              {loading ? "Mengirim..." : "Kirim Pesan →"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
