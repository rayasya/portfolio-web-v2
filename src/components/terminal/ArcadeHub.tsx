"use client";

import { useState } from "react";
import { Gamepad2, Play, Sparkles, Terminal, Code, Cpu, Award } from "lucide-react";
import TerminalSnake from "@/components/terminal/TerminalSnake";
import TerminalTetris from "@/components/terminal/TerminalTetris";
import TerminalTypingTest from "@/components/terminal/TerminalTypingTest";
import TerminalTicTacToe from "@/components/terminal/TerminalTicTacToe";
import TerminalQuiz from "@/components/terminal/TerminalQuiz";

export default function ArcadeHub() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: "snake",
      title: "Snake Classic",
      icon: Gamepad2,
      cmd: "snake",
      color: "text-emerald-500 border-emerald-500/40 bg-emerald-500/10",
      desc: "Game Snake retro 15x15. Kontrol panah / WASD.",
    },
    {
      id: "tetris",
      title: "Tetris Classic",
      icon: Cpu,
      cmd: "tetris",
      color: "text-cyan-500 border-cyan-500/40 bg-cyan-500/10",
      desc: "Game balok Tetris 10x18 klasik dengan rotasi.",
    },
    {
      id: "typing",
      title: "Developer Typing WPM Test",
      icon: Code,
      cmd: "typing",
      color: "text-amber-500 border-amber-500/40 bg-amber-500/10",
      desc: "Tes kecepatan mengetik cuplikan kode WPM & akurasi.",
    },
    {
      id: "tictactoe",
      title: "Tic-Tac-Toe vs AI Bot",
      icon: Terminal,
      cmd: "tictactoe",
      color: "text-rose-500 border-rose-500/40 bg-rose-500/10",
      desc: "Main Tic-Tac-Toe 3x3 melawan AI Bot terminal.",
    },
    {
      id: "quiz",
      title: "Fullstack Engineering Trivia",
      icon: Award,
      cmd: "quiz",
      color: "text-purple-500 border-purple-500/40 bg-purple-500/10",
      desc: "Kuis trivia seputar Next.js, React 19, & SQL.",
    },
  ];

  if (activeGame) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setActiveGame(null)}
          className="rounded bg-slate-800 text-slate-200 px-3 py-1.5 text-xs font-mono font-bold hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 shadow-sm"
        >
          ⬅ Back to Arcade Hub Menu
        </button>

        {activeGame === "snake" && <TerminalSnake />}
        {activeGame === "tetris" && <TerminalTetris />}
        {activeGame === "typing" && <TerminalTypingTest />}
        {activeGame === "tictactoe" && <TerminalTicTacToe />}
        {activeGame === "quiz" && <TerminalQuiz />}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 font-mono text-xs shadow-md dark:shadow-xl space-y-4 max-w-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-emerald-500 animate-pulse" />
            SECRET DEVELOPER ARCADE HUB // v4.0
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] font-sans mt-0.5">
            Pilih mini game terminal favorit Anda untuk dimainkan langsung!
          </p>
        </div>
        <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
          5 GAMES AVAILABLE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {games.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.id}
              onClick={() => setActiveGame(g.id)}
              className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3.5 space-y-2 cursor-pointer hover:border-emerald-500/50 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${g.color} flex items-center gap-1`}>
                    <Icon className="h-3 w-3" /> {g.title}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">cmd: {g.cmd}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed pt-1">
                  {g.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end text-[11px] text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                <span>Play Game ➔</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
