"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/components/ProjectCard";
import { CertificateData } from "@/components/CertificateItem";
import ProjectCard from "@/components/ProjectCard";
import CertificateItem from "@/components/CertificateItem";
import ContactForm from "@/components/admin/ContactForm";

import MatrixRain from "@/components/terminal/MatrixRain";
import HtopMonitor from "@/components/terminal/HtopMonitor";
import TerminalSnake from "@/components/terminal/TerminalSnake";
import TerminalTetris from "@/components/terminal/TerminalTetris";
import TerminalTypingTest from "@/components/terminal/TerminalTypingTest";
import TerminalTicTacToe from "@/components/terminal/TerminalTicTacToe";
import TerminalQuiz from "@/components/terminal/TerminalQuiz";
import ArcadeHub from "@/components/terminal/ArcadeHub";
import LofiJukebox from "@/components/terminal/LofiJukebox";
import { playKeySound } from "@/lib/sound";

import {
  Terminal as TerminalIcon,
  Gamepad2,

  Folder,
  FileCode,
  FileText,
  Mail,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Activity,
  Database,
  Cpu,
  CornerDownLeft,
  MoonStar,
  SunMedium,
  Menu,
  X,
  Code,
  Server,
  Layers,
  ShieldCheck,
  GitBranch,
  Clock,
  Volume2,
  VolumeX,
  Download,
  Monitor,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

type TerminalWorkspaceProps = {
  projects: ProjectData[];
  certificates: CertificateData[];
};

type HistoryItem = {
  id: string;
  command: string;
  timestamp: string;
  path: string;
  output: ReactNode;
};

const ALL_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "certs",
  "contact",
  "htop",
  "matrix",
  "snake",
  "tetris",
  "typing",
  "tictactoe",
  "quiz",
  "arcade",
  "games",
  "secret",
  "music",
  "lofi",
  "play music",
  "radio",
  "cv",
  "resume",
  "download resume",
  "download portfolio",
  "whoami",
  "cat",
  "clear",
  "sudo hire-me",
  "01_bio.json",
  "02_skills.ts",
  "03_projects",
  "04_certificates",
  "05_contact.sh",
  "06_arcade.sh",
];


// Oh My Zsh / Powerlevel10k Style Header Prompt Segment (Light & Dark Compatible)
function OhMyZshPrompt({ path = "~/portfolio", time }: { path?: string; time?: string }) {
  const currentTime = time || "12:00:00 PM";
  return (

    <div className="w-full space-y-1 font-mono text-xs select-none">
      {/* Top Line Segment */}
      <div className="flex items-center justify-between gap-1 text-[11px]">
        <div className="flex items-center">
          {/* Segment 1: User / OS Badge */}
          <span className="bg-emerald-600 dark:bg-emerald-500 text-slate-950 px-2 py-0.5 font-bold flex items-center gap-1 rounded-l text-[10px]">
            <span>⚡</span> ray@fullstack
          </span>
          <span className="text-emerald-600 dark:text-emerald-500 bg-cyan-700 dark:bg-cyan-800 font-bold leading-none"></span>

          {/* Segment 2: Directory Path */}
          <span className="bg-cyan-700 dark:bg-cyan-800 text-cyan-100 px-2.5 py-0.5 font-semibold flex items-center gap-1 text-[10px]">
            <span>📁</span> {path}
          </span>
          <span className="text-cyan-700 dark:text-cyan-800 font-bold leading-none"></span>
        </div>

        {/* Dotted separator line filler */}
        <div className="flex-1 border-b border-dashed border-slate-300 dark:border-slate-800/80 mx-2 hidden sm:block"></div>

        {/* Right Segment: Time & Status */}
        <div className="hidden sm:flex items-center text-[10px]">
          <span className="text-slate-300 dark:text-slate-800 font-bold leading-none"></span>
          <span className="bg-slate-300 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 font-bold flex items-center gap-1">
            <span>✔</span> 200 OK
          </span>
          <span className="text-slate-300 dark:text-slate-800 bg-slate-200 dark:bg-slate-900 font-bold leading-none"></span>
          <span className="bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2 py-0.5 font-medium flex items-center gap-1 rounded-r border border-l-0 border-slate-300 dark:border-slate-800">
            <span>at</span> {currentTime} <Clock className="h-3 w-3 text-slate-500" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TerminalWorkspace({
  projects,
  certificates,
}: TerminalWorkspaceProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [ping, setPing] = useState(14);
  const [currentPath, setCurrentPath] = useState("~/portfolio");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState("");

  // Command History Navigation States (Up/Down Arrow)
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState<number>(-1);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setPing(Math.floor(10 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (soundEnabled) playKeySound(0.04);
  };

  // Keyboard navigation & Tab autocomplete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = cmdHistoryIdx === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIdx - 1);
      setCmdHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIdx === -1) return;
      const nextIdx = cmdHistoryIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setCmdHistoryIdx(-1);
        setInput("");
      } else {
        setCmdHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const query = input.trim().toLowerCase();
      if (!query) return;
      const matches = ALL_COMMANDS.filter((c) => c.startsWith(query));
      if (matches.length === 1) {
        setInput(matches[0]);
        if (soundEnabled) playKeySound(0.08);
      }
    }
  };

  // Welcome banner output
  const welcomeOutput = (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-4 font-mono text-xs"
    >
      <pre className="text-emerald-600 dark:text-emerald-400 font-bold leading-tight hidden sm:block text-[11px] select-none filter drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
        {`
 ██████╗  █████╗ ██╗   ██╗
 ██╔══██╗██╔══██╗╚██╗ ██╔╝
 ██████╔╝███████║ ╚████╔╝ 
 ██╔══██╗██╔══██║  ╚██╔╝  
 ██║  ██║██║  ██║   ██║   
 ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
 ╔═════════════════════════════════════╗
 ║   FULLSTACK DEVELOPER SYSTEM SHELL  ║
 ╚═════════════════════════════════════╝
`}
      </pre>

      <div className="text-slate-800 dark:text-slate-300 space-y-1.5 bg-white dark:bg-slate-900/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
          Ray's Oh My Zsh / Powerlevel10k Shell v3.7.0
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Selamat datang di portofolio berkonsep <span className="text-cyan-600 dark:text-cyan-400 font-bold">Terminal & IDE Workspace</span>!
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-[11px]">
          Ketik <span className="text-emerald-600 dark:text-emerald-400 font-bold">help</span>, <span className="text-cyan-600 dark:text-cyan-400 font-bold">htop</span>, <span className="text-amber-600 dark:text-amber-400 font-bold">matrix</span>, <span className="text-purple-600 dark:text-purple-400 font-bold">snake</span>, <span className="text-rose-600 dark:text-rose-400 font-bold">cv</span>, atau klik file pada <span className="text-slate-900 dark:text-slate-200 underline">Sidebar Kiri</span>. Gunakan panah <span className="text-emerald-600 dark:text-emerald-400 font-bold">↑/↓</span> untuk riwayat command & tombol <span className="text-cyan-600 dark:text-cyan-400 font-bold">Tab</span> untuk autocomplete!
        </p>
      </div>
    </motion.div>
  );

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init",
      command: "init portfolio.sh",
      timestamp: "12:00:00 PM",
      path: "~/portfolio",
      output: welcomeOutput,
    },
  ]);


  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // Execute terminal commands
  const executeCommand = (cmdStr: string, customPath?: string) => {
    if (soundEnabled) playKeySound(0.08);
    const trimmed = cmdStr.trim().toLowerCase();
    let response: ReactNode = null;
    const targetPath = customPath || currentPath;

    if (!trimmed) return;

    // Push to Command History
    setCmdHistory((prev) => [...prev, cmdStr]);
    setCmdHistoryIdx(-1);

    switch (trimmed) {
      case "help":
        response = (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 text-xs font-mono text-slate-800 dark:text-slate-300"
          >
            <p className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <span>🚀</span> Available Shell Commands:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white dark:bg-slate-900/90 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("01_bio.json")}><span className="text-cyan-600 dark:text-cyan-400 font-bold">about</span> / <span className="text-cyan-600 dark:text-cyan-400">01_bio.json</span> - Bio & System Specs</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("02_skills.ts")}><span className="text-emerald-600 dark:text-emerald-400 font-bold">skills</span> / <span className="text-emerald-600 dark:text-emerald-400">02_skills.ts</span> - Tech Stack Matrix</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("03_projects")}><span className="text-purple-600 dark:text-purple-400 font-bold">projects</span> / <span className="text-purple-600 dark:text-purple-400">03_projects</span> - Fullstack & API Projects</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("04_certificates")}><span className="text-amber-600 dark:text-amber-400 font-bold">certs</span> / <span className="text-amber-600 dark:text-amber-400">04_certificates</span> - Verified SSL Certs</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("05_contact.sh")}><span className="text-rose-600 dark:text-rose-400 font-bold">contact</span> / <span className="text-rose-600 dark:text-rose-400">05_contact.sh</span> - HTTP POST Form</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("htop")}><span className="text-cyan-500 font-bold">htop</span> / <span className="text-cyan-500">top</span> - Live System Monitor</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("matrix")}><span className="text-emerald-400 font-bold">matrix</span> - Matrix Digital Rain</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("snake")}><span className="text-amber-500 font-bold">snake</span> - Terminal Snake Game</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("lofi")}><span className="text-purple-500 font-bold">lofi</span> / <span className="text-purple-500">music</span> - Lo-Fi Coding Beats Radio 🎧</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("cv")}><span className="text-blue-500 font-bold">cv</span> / <span className="text-blue-500">resume</span> - Download Curriculum Vitae</div>

              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("whoami")}><span className="text-purple-400 font-bold">whoami</span> - Visitor Client Info</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("sudo hire-me")}><span className="text-blue-600 dark:text-blue-400 font-bold">sudo hire-me</span> - Execute Hire Protocol 🎉</div>
              <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => executeCommand("clear")}><span className="text-slate-500 dark:text-slate-400 font-bold">clear</span> - Clear terminal buffer</div>
            </div>
          </motion.div>
        );
        break;

      case "htop":
      case "top":
        response = <HtopMonitor />;
        break;

      case "matrix":
        setMatrixActive(true);
        response = (
          <p className="text-xs font-mono text-emerald-400 font-bold">
            🟢 Matrix Digital Rain launched! Press <span className="underline">ESC</span> or click exit to close.
          </p>
        );
        break;

      case "snake":
        response = <TerminalSnake />;
        break;

      case "tetris":
        response = <TerminalTetris />;
        break;

      case "typing":
      case "speedtest":
        response = <TerminalTypingTest />;
        break;

      case "tictactoe":
      case "ttt":
        response = <TerminalTicTacToe />;
        break;

      case "quiz":
      case "trivia":
        response = <TerminalQuiz />;
        break;

      case "arcade":
      case "games":
      case "secret":
      case "06_arcade.sh":
        setCurrentPath("~/portfolio/06_arcade.sh");
        response = <ArcadeHub />;
        break;


      case "music":
      case "lofi":
      case "play music":
      case "radio":
      case "song":
        response = <LofiJukebox />;
        break;


      case "cv":
      case "resume":
      case "download resume":
      case "download portfolio":
      case "portfolio.pdf":
      case "cv.pdf":
        response = (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 sm:p-5 font-mono text-xs space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4" /> Download Official Documents (PDF)
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                HTTP 200 OK
              </span>
            </div>

            <p className="text-slate-700 dark:text-slate-300 font-sans text-xs leading-relaxed">
              Unduh dokumen resmi Curriculum Vitae (CV) dan Ringkasan Portofolio proyek Fullstack Engineering milik Muhammad Rayasya Dziqi Cahyana dalam format PDF:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Button 1: Download CV PDF */}
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3.5 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 font-bold">
                    <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> Curriculum Vitae</span>
                    <span className="text-[10px] text-slate-500">PDF</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
                    Pengalaman kerja, tech stack, dan riwayat pendidikan.
                  </p>
                </div>
                <a
                  href="/cv.pdf"
                  download="Muhammad Rayasya Dziqi Cahyana_CV.pdf"
                  onClick={(e) => {
                    fetch("/cv.pdf", { method: "HEAD" }).then((res) => {
                      if (!res.ok) {
                        e.preventDefault();
                        window.print();
                      }
                    }).catch(() => {
                      e.preventDefault();
                      window.print();
                    });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 font-bold transition-colors text-xs shadow-md"
                >
                  <Download className="h-3.5 w-3.5" /> Download CV (PDF)
                </a>
              </div>

              {/* Button 2: Download Portfolio PDF */}
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3.5 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 font-bold">
                    <span className="flex items-center gap-1.5"><Folder className="h-4 w-4" /> Project Portfolio</span>
                    <span className="text-[10px] text-slate-500">PDF</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
                    Dokumentasi API, arsitektur sistem, dan link proyek.
                  </p>
                </div>
                <a
                  href="/portfolio.pdf"
                  download="Muhammad Rayasya Dziqi Cahyana_Portfolio.pdf"
                  onClick={(e) => {
                    fetch("/portfolio.pdf", { method: "HEAD" }).then((res) => {
                      if (!res.ok) {
                        e.preventDefault();
                        window.print();
                      }
                    }).catch(() => {
                      e.preventDefault();
                      window.print();
                    });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 font-bold transition-colors text-xs shadow-md"
                >
                  <Download className="h-3.5 w-3.5" /> Download Portfolio (PDF)
                </a>
              </div>
            </div>
          </motion.div>
        );
        break;

      case "whoami":
        response = (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-purple-500/30 bg-purple-950/20 p-3.5 font-mono text-xs space-y-1.5 text-purple-300"
          >
            <p className="font-bold text-purple-400 flex items-center gap-1.5">
              <Monitor className="h-4 w-4" /> Visitor Client Inspection (whoami):
            </p>
            <p>• User Agent: <span className="text-slate-300">{typeof window !== "undefined" ? window.navigator.userAgent.slice(0, 60) + "..." : "Unknown"}</span></p>
            <p>• Screen Size: <span className="text-slate-300">{typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "Unknown"}</span></p>
            <p>• Connection Status: <span className="text-emerald-400 font-bold">HTTP 200 OK (ONLINE)</span></p>
          </motion.div>
        );
        break;

      case "cat":
        response = (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 text-xs font-mono text-amber-400"
          >
            <pre className="font-bold text-[11px]">
              {`
 /\___/\\
(  o.o  )  "Talk is cheap. Show me the code."
 > ^ <     - Linus Torvalds
`}
            </pre>
          </motion.div>
        );
        break;

      case "about":
      case "cat 01_bio.json":
      case "01_bio.json":
        setCurrentPath("~/portfolio/01_bio.json");
        response = (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 font-mono text-xs"
          >
            {/* Fastfetch Terminal System Header */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex flex-col items-center gap-2 shrink-0 mx-auto md:mx-0">
                  <div className="relative h-28 w-28 overflow-hidden rounded-xl border-2 border-emerald-500/40 shadow-md">
                    <Image
                      src="https://i.imgur.com/7kFwLzt.jpeg"
                      alt="Foto Ray"
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    🟢 SYSTEM ONLINE
                  </span>
                </div>

                <div className="flex-1 w-full space-y-2 text-xs">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      ray@fullstack-workspace
                    </span>
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">fastfetch v2.8</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                    <p><strong className="text-emerald-600 dark:text-emerald-400">OS:</strong> <span className="text-slate-700 dark:text-slate-300">RayOS Fullstack System</span></p>
                    <p><strong className="text-emerald-600 dark:text-emerald-400">Host:</strong> <span className="text-slate-700 dark:text-slate-300">ray-workspace-app</span></p>
                    <p><strong className="text-cyan-600 dark:text-cyan-400">Kernel:</strong> <span className="text-slate-700 dark:text-slate-300">Next.js 16 / React 19</span></p>
                    <p><strong className="text-cyan-600 dark:text-cyan-400">Shell:</strong> <span className="text-slate-700 dark:text-slate-300">zsh 5.9 (x86_64-fullstack)</span></p>
                    <p><strong className="text-amber-600 dark:text-amber-400">Uptime:</strong> <span className="text-slate-700 dark:text-slate-300">2+ Years Engineering</span></p>
                    <p><strong className="text-amber-600 dark:text-amber-400">Resolution:</strong> <span className="text-slate-700 dark:text-slate-300">4K Responsive Canvas</span></p>
                    <p><strong className="text-purple-600 dark:text-purple-400">Packages:</strong> <span className="text-slate-700 dark:text-slate-300">Node, TS, PG, Docker</span></p>
                    <p><strong className="text-purple-600 dark:text-purple-400">Status:</strong> <span className="text-emerald-600 dark:text-emerald-400 font-bold">AVAILABLE_FOR_HIRING</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* IDE File Tab: 01_bio.json */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 text-xs font-mono shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-3 text-slate-500 dark:text-slate-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                  <FileText className="h-4 w-4" /> ~/portfolio/01_bio.json
                </span>
                <span className="text-[10px] text-slate-500">JSON / UTF-8</span>
              </div>

              <div className="space-y-3 font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  👋 Halo! Aku Muhammad Rayasya Dziqi Cahyana — Fullstack Software Engineer.
                </p>
                <p>
                  Aku berdedikasi menciptakan aplikasi web yang utuh dari dasar hingga siap rilis (*End-to-End*). Fokus utamaku mencakup perancangan arsitektur backend RESTful API yang scalable, optimasi query relational database (PostgreSQL/NeonDB), hingga pembuatan antarmuka frontend yang modern, cepat, dan responsif.
                </p>
              </div>

              <div className="mt-3 bg-slate-100 dark:bg-slate-900/90 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-amber-600 dark:text-amber-300">
                <p className="text-slate-500 font-bold mb-1 text-[10px]">// RAW JSON PAYLOAD</p>
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify(
                    {
                      name: "Muhammad Rayasya Dziqi Cahyana",
                      role: "Fullstack Engineer",
                      skills: ["React 19", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Drizzle", "Docker"],
                      workingStyle: "Clean code, fast performance, & intuitive user interfaces.",
                      openForWork: true,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </motion.div>
        );
        break;

      case "skills":
      case "cat 02_skills.ts":
      case "02_skills.ts":
        setCurrentPath("~/portfolio/02_skills.ts");
        response = (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 font-mono text-xs"
          >
            <p className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
              <Code className="h-4 w-4" /> Fullstack Tech Stack Matrix (02_skills.ts)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
                  <Layers className="h-4 w-4" /> Frontend Technologies
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {["React 19", "Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5/CSS3"].map((s) => (
                    <span key={s} className="rounded bg-slate-100 dark:bg-slate-950 px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">{s}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Server className="h-4 w-4" /> Backend Technologies
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {["Node.js", "Express", "TypeScript", "Go", "Python", "REST APIs", "gRPC", "WebSockets"].map((s) => (
                    <span key={s} className="rounded bg-slate-100 dark:bg-slate-950 px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">{s}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
                  <Database className="h-4 w-4" /> Databases & ORM
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {["PostgreSQL", "Neon Database", "Redis", "Drizzle ORM", "Prisma", "MySQL"].map((s) => (
                    <span key={s} className="rounded bg-slate-100 dark:bg-slate-950 px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">{s}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
                  <Cpu className="h-4 w-4" /> DevOps & Tools
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {["Docker", "Git", "GitHub Actions", "Vercel", "Linux Shell", "Clerk Auth"].map((s) => (
                    <span key={s} className="rounded bg-slate-100 dark:bg-slate-950 px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
        break;

      case "projects":
      case "ls ./03_projects":
      case "03_projects":
        setCurrentPath("~/portfolio/03_projects");
        response = (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <p className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-2">
                <Folder className="h-4 w-4 text-purple-600 dark:text-purple-400" /> ~/portfolio/03_projects ({projects.length} files found)
              </p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">HTTP 200 OK</span>
            </div>

            {projects.length === 0 ? (
              <div className="rounded bg-white dark:bg-slate-900 p-4 text-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                204 NO_CONTENT - Belum ada project di database.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        );
        break;

      case "certs":
      case "ls ./04_certificates":
      case "04_certificates":
        setCurrentPath("~/portfolio/04_certificates");
        response = (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <p className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" /> ~/portfolio/04_certificates ({certificates.length} items)
              </p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">SSL_VERIFIED</span>
            </div>

            {certificates.length === 0 ? (
              <div className="rounded bg-white dark:bg-slate-900 p-4 text-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                204 NO_CONTENT - Belum ada sertifikat di database.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {certificates.map((c, i) => (
                  <CertificateItem key={c.id} certificate={c} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        );
        break;

      case "contact":
      case "./05_contact.sh":
      case "05_contact.sh":
        setCurrentPath("~/portfolio/05_contact.sh");
        response = (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 font-mono text-xs"
          >
            <p className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-2">
              <Mail className="h-4 w-4" /> Executing ./05_contact.sh (POST /api/v1/contact)
            </p>
            <ContactForm />
          </motion.div>
        );
        break;

      case "sudo hire-me":
      case "hire":
        response = (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="rounded-lg border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30 p-4 font-mono text-xs text-emerald-800 dark:text-emerald-300 space-y-2 shadow-sm"
          >
            <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span>PERMISSIONS GRANTED! Hire Protocol Initialized 🎉</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-sans text-xs">
              Terima kasih! Aku siap berkontribusi sebagai Fullstack Engineer di tim Anda. Silakan hubungi aku melalui tab <span className="text-cyan-600 dark:text-cyan-400 underline cursor-pointer" onClick={() => executeCommand("05_contact.sh")}>05_contact.sh</span> atau kirim pesan email langsung.
            </p>
          </motion.div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        response = (
          <p className="text-xs font-mono text-rose-600 dark:text-rose-400">
            zsh: command not found: <span className="font-bold text-slate-800 dark:text-slate-200">{trimmed}</span>. Type <span className="text-cyan-600 dark:text-cyan-400 underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> or click files in the left sidebar.
          </p>
        );
        break;
    }

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmdStr,
        timestamp: timeNow,
        path: targetPath,
        output: response,
      },
    ]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  const sidebarItems = [
    { name: "01_bio.json", icon: FileText, cmd: "01_bio.json", path: "~/portfolio/01_bio.json", color: "text-cyan-600 dark:text-cyan-400" },
    { name: "02_skills.ts", icon: FileCode, cmd: "02_skills.ts", path: "~/portfolio/02_skills.ts", color: "text-emerald-600 dark:text-emerald-400" },
    { name: "03_projects/", icon: Folder, cmd: "03_projects", path: "~/portfolio/03_projects", color: "text-purple-600 dark:text-purple-400" },
    { name: "04_certificates/", icon: ShieldCheck, cmd: "04_certificates", path: "~/portfolio/04_certificates", color: "text-amber-600 dark:text-amber-400" },
    { name: "05_contact.sh", icon: TerminalIcon, cmd: "05_contact.sh", path: "~/portfolio/05_contact.sh", color: "text-rose-600 dark:text-rose-400" },
    { name: "06_arcade.sh", icon: Gamepad2, cmd: "06_arcade.sh", path: "~/portfolio/06_arcade.sh", color: "text-amber-500 font-bold" },
  ].filter((item) => item.name.toLowerCase().includes(sidebarSearch.toLowerCase()));


  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-mono selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300">
      {/* Matrix Rain Overlay */}
      {matrixActive && <MatrixRain onClose={() => setMatrixActive(false)} />}

      {/* 1. TOP IDE WINDOW HEADER BAR */}
      <header className="shrink-0 flex items-center justify-between border-b border-slate-300 dark:border-slate-800 bg-slate-200/90 dark:bg-slate-900/90 px-3 py-2 text-xs z-40 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center gap-3">
          {/* macOS window control buttons */}
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer" onClick={() => executeCommand("clear")}></div>
            <div className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer" onClick={() => setMatrixActive(true)}></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer" onClick={() => executeCommand("sudo hire-me")}></div>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <span className="hidden sm:flex items-center gap-2 font-bold text-slate-800 dark:text-slate-300">
            <TerminalIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ray@fullstack-workspace: {currentPath} (zsh)
          </span>
        </div>

        {/* Right Status Metrics */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="hidden sm:flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <Activity className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
            <span>Ping: <strong className="text-cyan-600 dark:text-cyan-400">{ping}ms</strong></span>
          </div>

          {/* Keypress Sound Toggle Button */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1 rounded bg-slate-300/60 dark:bg-slate-800 px-2 py-0.5 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="Toggle Mechanical Key Sounds"
          >
            {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-emerald-500" /> : <VolumeX className="h-3.5 w-3.5 text-slate-400" />}
            <span className="hidden sm:inline text-[10px]">{soundEnabled ? "Audio On" : "Muted"}</span>
          </button>

          <div className="flex items-center gap-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>HTTP 200 OK</span>
          </div>

          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded bg-slate-300/60 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title="Toggle Light / Dark Mode"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </button>
          )}
        </div>
      </header>

      {/* 2. MAIN CONTAINER: SIDEBAR + TERMINAL BUFFER */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Left File Explorer Sidebar */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            } transition-transform duration-300 absolute md:relative z-30 shrink-0 w-64 h-full border-r border-slate-300 dark:border-slate-800 bg-slate-100/95 dark:bg-slate-900/60 p-3 flex flex-col justify-between text-xs font-mono overflow-y-auto`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-bold border-b border-slate-300 dark:border-slate-800 pb-2 text-[11px] uppercase tracking-wider">
              <span>EXPLORER // PORTFOLIO</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">v3.7</span>
            </div>

            {/* Sidebar Search Filter Input */}
            <div className="relative">
              <Search className="h-3 w-3 text-slate-400 absolute left-2 top-2.5" />
              <input
                type="text"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                placeholder="Filter files..."
                className="w-full bg-white dark:bg-slate-950 pl-7 pr-2 py-1 text-[11px] rounded border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300 font-bold text-xs py-1">
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                <Folder className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>~/portfolio</span>
              </div>

              <div className="pl-4 space-y-0.5">
                {sidebarItems.length === 0 ? (
                  <p className="text-[10px] text-slate-400 italic py-2">No files match search</p>
                ) : (
                  sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          executeCommand(item.cmd, item.path);
                          if (window.innerWidth < 768) setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 rounded px-2 py-1.5 transition-colors text-left font-mono text-[11px] ${isActive
                          ? "bg-slate-200 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold border-l-2 border-emerald-500 pl-2"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100"
                          }`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                        <span>{item.name}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Chips Footer in Sidebar */}
          <div className="pt-4 border-t border-slate-300 dark:border-slate-800 space-y-2 shrink-0">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Quick Commands</p>
            <div className="flex flex-wrap gap-1">
              {[
                { label: "help", cmd: "help" },
                { label: "htop", cmd: "htop" },
                { label: "matrix", cmd: "matrix" },
                { label: "snake", cmd: "snake" },
                { label: "lofi", cmd: "lofi" },
                { label: "cv", cmd: "cv" },
                { label: "clear", cmd: "clear" },

              ].map((item) => (
                <button
                  key={item.cmd}
                  type="button"
                  onClick={() => executeCommand(item.cmd)}
                  className="rounded border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 py-1 text-[10px] text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500/50 dark:hover:text-emerald-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Interactive Shell Area (Scrolls internally) */}
        <main
          className="flex-1 h-full overflow-y-auto p-4 sm:p-6 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 cursor-text bg-grid-pattern transition-colors duration-300"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex-1 space-y-6 max-w-5xl">
            <AnimatePresence>
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-2 border-b border-dashed border-slate-300 dark:border-slate-800/70 pb-6"
                >
                  {/* Oh My Zsh / Powerlevel10k Header Prompt */}
                  <OhMyZshPrompt path={item.path} time={item.timestamp} />

                  {/* Prompt Line 2 */}
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <span className="text-slate-400 dark:text-slate-500 font-bold">╰─❯</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">ray@fullstack:~$</span>
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">{item.command}</span>
                  </div>

                  {/* Output Buffer */}
                  <div className="pl-3 sm:pl-5 pt-1">{item.output}</div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Live Interactive Prompt Input Line */}
            <div className="space-y-2 pt-2">
              <OhMyZshPrompt path={currentPath} />

              <form onSubmit={handleSubmit} className="flex items-center gap-2 text-xs pt-1">
                <span className="text-slate-400 dark:text-slate-500 font-bold">╰─❯</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">ray@fullstack:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none font-mono"
                  placeholder="Type command ('help', 'htop', 'matrix', 'snake', 'cv', 'about'). Press Tab to autocomplete, ↑/↓ for history..."
                  autoComplete="off"
                  spellCheck="false"
                />
                <span className="inline-block h-4 w-2 bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                <button type="submit" className="text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <CornerDownLeft className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

            <div ref={terminalEndRef} />
          </div>
        </main>
      </div>

      {/* 3. BOTTOM IDE STATUS BAR */}
      <footer className="shrink-0 border-t border-slate-300 dark:border-slate-800 bg-slate-200/90 dark:bg-slate-900/90 px-3 py-1.5 text-[11px] text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between font-mono gap-2 z-40 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-800 dark:text-slate-300 font-bold">
            <span className="text-emerald-600 dark:text-emerald-400">git:(main)*</span>
          </span>
          <span className="hidden sm:inline">TypeScript 5.8</span>
          <span className="hidden sm:inline">Next.js 16</span>
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Database className="h-3 w-3" /> Neon PostgreSQL 🟢
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-600 dark:text-cyan-400 font-medium">UTF-8</span>
          <span>Ln 1, Col 1</span>
          <a
            href="https://github.com/rayrayaray"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <GitBranch className="h-3 w-3" /> rayrayaray
          </a>
        </div>
      </footer>
    </div>
  );
}
