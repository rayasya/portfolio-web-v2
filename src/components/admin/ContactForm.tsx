"use client";

import { useState } from "react";
import { addContact } from "@/lib/actions";
import { Send, CheckCircle2, Terminal, Code2 } from "lucide-react";

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
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    await addContact(data);
    setSent(true);
    setLoading(false);
    form.reset();
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 font-mono shadow-xl overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="rounded bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 font-bold text-cyan-400">
            POST
          </span>
          <span className="text-slate-200 font-bold">/api/v1/contact</span>
        </div>
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <Terminal className="h-3 w-3 text-emerald-400" /> payload: application/json
        </span>
      </div>

      <div className="p-5 space-y-4">
        {sent ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span>HTTP 201 CREATED - MESSAGE_DELIVERED</span>
            </div>
            <pre className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded border border-slate-800 leading-relaxed">
{JSON.stringify(
  {
    status: 201,
    code: "SUCCESS_OK",
    response: "Pesan telah masuk ke database Neon PG. Ray akan membalas pesanmu secepatnya!",
    timestamp: new Date().toISOString(),
  },
  null,
  2
)}
            </pre>
            <button
              onClick={() => setSent(false)}
              className="text-xs font-bold text-cyan-400 hover:underline pt-2 inline-block"
            >
              ← Send Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold mb-1">
              <Code2 className="h-3.5 w-3.5 text-emerald-400" /> JSON Body Payload:
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">
                  "sender_name": <span className="text-slate-500">(string, required)</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. Alex Software Engineer"
                  required
                  className="w-full rounded border border-slate-800 bg-slate-900 px-3.5 py-2 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">
                  "email_address": <span className="text-slate-500">(string, email)</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="alex@company.io"
                  required
                  className="w-full rounded border border-slate-800 bg-slate-900 px-3.5 py-2 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">
                  "message_payload": <span className="text-slate-500">(string, text)</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Pesan brief proyek, tawaran pekerjaan, atau ide kolaborasi..."
                  rows={4}
                  required
                  className="w-full rounded border border-slate-800 bg-slate-900 px-3.5 py-2 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none resize-none font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded bg-emerald-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 disabled:opacity-60 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <Send className="h-3.5 w-3.5" />
              {loading ? "EXECUTING HTTP POST..." : "EXECUTE POST /api/v1/contact"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

