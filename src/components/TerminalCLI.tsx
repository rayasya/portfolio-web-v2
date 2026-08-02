"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { Terminal as TerminalIcon, Play, CornerDownLeft, Sparkles, CheckCircle2, Cpu } from "lucide-react";

type HistoryItem = {
  command: string;
  output: ReactNode;
};

export default function TerminalCLI() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-bold">🚀 Ray's Backend Developer Shell v2.4.0</p>
          <p className="text-slate-400">
            Type <span className="text-cyan-400 font-semibold">help</span> or click command chips below to explore system services.
          </p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    let response: ReactNode = null;

    if (!trimmed) return;

    switch (trimmed) {
      case "help":
        response = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-emerald-400 font-semibold mb-1">Available System Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono">
              <div><span className="text-cyan-400 font-bold">about</span> or <span className="text-cyan-400">cat bio.json</span> - Backend Bio & Philosophy</div>
              <div><span className="text-cyan-400 font-bold">skills</span> or <span className="text-cyan-400">cat stack.log</span> - Tech Stack & Architecture</div>
              <div><span className="text-cyan-400 font-bold">projects</span> or <span className="text-cyan-400">ls ./projects</span> - Backend & Fullstack Projects</div>
              <div><span className="text-cyan-400 font-bold">certs</span> or <span className="text-cyan-400">ls ./certs</span> - Verified Credentials</div>
              <div><span className="text-cyan-400 font-bold">contact</span> or <span className="text-cyan-400">ping contact.service</span> - Contact Info & API</div>
              <div><span className="text-cyan-400 font-bold">sudo hire-me</span> - Execute Hire Protocol 🎉</div>
              <div><span className="text-cyan-400 font-bold">clear</span> - Clear terminal buffer</div>
            </div>
          </div>
        );
        break;

      case "about":
      case "cat bio.json":
        response = (
          <div className="rounded-md border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-400 space-y-1">
            <p className="text-slate-400">{"{"}</p>
            <p className="pl-4"><span className="text-cyan-400">"name"</span>: <span className="text-amber-300">"Ray (rayrayaray)"</span>,</p>
            <p className="pl-4"><span className="text-cyan-400">"role"</span>: <span className="text-amber-300">"Backend Developer & System Architect"</span>,</p>
            <p className="pl-4"><span className="text-cyan-400">"focus"</span>: [<span className="text-amber-300">"API Design"</span>, <span className="text-amber-300">"Database Engineering"</span>, <span className="text-amber-300">"Performance Optimization"</span>, <span className="text-amber-300">"Microservices"</span>],</p>
            <p className="pl-4"><span className="text-cyan-400">"status"</span>: <span className="text-emerald-400 font-bold">"AVAILABLE_FOR_HIRING"</span>,</p>
            <p className="pl-4"><span className="text-cyan-400">"bio"</span>: <span className="text-slate-300">"Fokus membangun sistem server yang handal, cepat, scalable, dengan struktur database yang terorganisir dan arsitektur REST/gRPC API yang rapi."</span></p>
            <p className="text-slate-400">{"}"}</p>
          </div>
        );
        break;

      case "skills":
      case "cat stack.log":
        response = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-bold">⚡ Core Backend Tech Stack & Infrastructure:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="rounded border border-slate-800 bg-slate-900/90 p-2">
                <p className="text-emerald-400 font-bold">Languages & Runtime</p>
                <p className="text-slate-300 text-[11px]">Node.js, TypeScript, Go, Python</p>
              </div>
              <div className="rounded border border-slate-800 bg-slate-900/90 p-2">
                <p className="text-cyan-400 font-bold">Databases & ORM</p>
                <p className="text-slate-300 text-[11px]">PostgreSQL, NeonDB, Redis, Drizzle ORM</p>
              </div>
              <div className="rounded border border-slate-800 bg-slate-900/90 p-2">
                <p className="text-amber-400 font-bold">APIs & Architecture</p>
                <p className="text-slate-300 text-[11px]">RESTful APIs, WebSockets, Auth (Clerk/JWT)</p>
              </div>
              <div className="rounded border border-slate-800 bg-slate-900/90 p-2">
                <p className="text-purple-400 font-bold">DevOps & Cloud</p>
                <p className="text-slate-300 text-[11px]">Docker, Linux Shell, Git, Vercel, CI/CD</p>
              </div>
              <div className="rounded border border-slate-800 bg-slate-900/90 p-2">
                <p className="text-rose-400 font-bold">Testing & Security</p>
                <p className="text-slate-300 text-[11px]">Jest, Postman, Rate-Limiting, CORS</p>
              </div>
              <div className="rounded border border-slate-800 bg-slate-900/90 p-2">
                <p className="text-blue-400 font-bold">Fullstack Support</p>
                <p className="text-slate-300 text-[11px]">Next.js 16, React 19, Tailwind CSS</p>
              </div>
            </div>
          </div>
        );
        break;

      case "projects":
      case "ls ./projects":
        response = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">📂 Scanning /projects directory...</p>
            <p className="text-slate-300">Scroll down to the <span className="text-cyan-400 font-bold">Projects Section</span> below for live interactive API documentation and detailed repositories.</p>
          </div>
        );
        break;

      case "certs":
      case "ls ./certs":
        response = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">📜 Scanning /certs directory...</p>
            <p className="text-slate-300">Scroll down to the <span className="text-cyan-400 font-bold">Certificates Section</span> to view verified credentials & certifications.</p>
          </div>
        );
        break;

      case "contact":
      case "ping contact.service":
        response = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">📡 PING contact.service (127.0.0.1): 56 data bytes</p>
            <p>64 bytes from rayrayaray: icmp_seq=1 ttl=64 time=1.24 ms</p>
            <p className="text-slate-400">Direct Endpoint: <a href="#contact" className="text-cyan-400 underline">#contact section</a></p>
          </div>
        );
        break;

      case "sudo hire-me":
      case "hire":
        response = (
          <div className="rounded-md border border-emerald-500/40 bg-emerald-950/30 p-3 text-xs font-mono text-emerald-300 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>PERMISSIONS GRANTED! Hire protocol initialized...</span>
            </div>
            <p className="text-slate-300">Siap berkontribusi dalam tim backend engineering Anda! Silakan hubungi aku melalui form kontak atau kirim email langsung.</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        response = (
          <p className="text-xs font-mono text-rose-400">
            command not found: <span className="font-bold text-slate-200">{trimmed}</span>. Type <span className="text-cyan-400 underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> for a list of available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: response }]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono text-sm">
      {/* Top macOS Style Window Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <TerminalIcon className="h-3.5 w-3.5 text-emerald-400" />
            ray@backend-server: ~/profile (bash)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Cpu className="h-3 w-3 text-cyan-400" />
          <span className="hidden sm:inline">CPU 1.2% | MEM 142MB</span>
        </div>
      </div>

      {/* Terminal Content Buffer */}
      <div 
        className="p-4 sm:p-5 max-h-[380px] overflow-y-auto space-y-4 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-bold">ray@backend:~$</span>
              <span className="text-slate-100 font-semibold">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}

        {/* Live Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold text-xs">ray@backend:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
            placeholder="Type command ('help', 'about', 'skills', 'projects', 'sudo hire-me')..."
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit" className="text-slate-500 hover:text-emerald-400 transition-colors">
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </form>

        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Chips Footer */}
      <div className="border-t border-slate-800/80 bg-slate-900/50 p-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
        <span className="text-[11px] text-slate-500 font-medium mr-1 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-amber-400" /> Quick Run:
        </span>
        {[
          "help",
          "about",
          "skills",
          "projects",
          "sudo hire-me",
          "clear",
        ].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            className="rounded border border-slate-800 bg-slate-950 px-2 py-0.5 text-[11px] text-slate-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
