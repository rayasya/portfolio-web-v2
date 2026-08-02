"use client";

import { useState, useEffect } from "react";
import { Cpu, HardDrive, Activity, Server, RefreshCw } from "lucide-react";

export default function HtopMonitor() {
  const [cpuLoad, setCpuLoad] = useState([38, 62, 45, 80]);
  const [memUsed, setMemUsed] = useState(4.8);
  const [tasks, setTasks] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad([
        Math.floor(25 + Math.random() * 45),
        Math.floor(40 + Math.random() * 50),
        Math.floor(30 + Math.random() * 40),
        Math.floor(50 + Math.random() * 45),
      ]);
      setMemUsed(Number((4.2 + Math.random() * 1.2).toFixed(1)));
      setTasks(Math.floor(40 + Math.random() * 6));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderProgressBar = (percent: number, colorClass: string) => {
    const bars = 24;
    const filled = Math.round((percent / 100) * bars);
    const empty = bars - filled;
    return (
      <div className="flex items-center gap-2 font-mono text-[11px]">
        <span className="text-slate-400">[{'█'.repeat(filled)}{'░'.repeat(empty)}]</span>
        <span className={`font-bold ${colorClass}`}>{percent}%</span>
      </div>
    );
  };

  const processList = [
    { pid: 1420, user: "ray", cpu: (cpuLoad[0] * 0.4).toFixed(1), mem: "1.2 GB", command: "node server.js (Next.js 16 App Router)" },
    { pid: 1589, user: "ray", cpu: (cpuLoad[1] * 0.3).toFixed(1), mem: "840 MB", command: "drizzle-orm / neon-postgresql-pool" },
    { pid: 2104, user: "ray", cpu: (cpuLoad[2] * 0.2).toFixed(1), mem: "420 MB", command: "turbopack-bundler --hot-reload" },
    { pid: 2890, user: "ray", cpu: "0.8", mem: "210 MB", command: "zsh --login / oh-my-zsh" },
    { pid: 3102, user: "root", cpu: "0.2", mem: "150 MB", command: "dockerd --storage-driver=overlay2" },
  ];

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 font-mono text-xs shadow-md dark:shadow-xl space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
          <Activity className="h-4 w-4 animate-pulse" />
          <span>htop - System Resource Monitor v3.2.1</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <RefreshCw className="h-3 w-3 animate-spin text-cyan-500" />
          <span>Live Update (2s)</span>
        </div>
      </div>

      {/* CPU Cores & RAM Meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] bg-slate-100 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 font-bold"><Cpu className="h-3.5 w-3.5 text-emerald-500" /> Core 0:</span>
            {renderProgressBar(cpuLoad[0], "text-emerald-500")}
          </div>
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 font-bold"><Cpu className="h-3.5 w-3.5 text-cyan-500" /> Core 1:</span>
            {renderProgressBar(cpuLoad[1], "text-cyan-500")}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 font-bold"><Cpu className="h-3.5 w-3.5 text-amber-500" /> Core 2:</span>
            {renderProgressBar(cpuLoad[2], "text-amber-500")}
          </div>
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 font-bold"><HardDrive className="h-3.5 w-3.5 text-purple-500" /> RAM:</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">[{'█'.repeat(Math.round((memUsed / 16) * 24))}{'░'.repeat(24 - Math.round((memUsed / 16) * 24))}]</span>
              <span className="font-bold text-purple-500">{memUsed}G / 16G</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="flex flex-wrap gap-4 text-[11px] text-slate-600 dark:text-slate-400">
        <p>Tasks: <strong className="text-slate-900 dark:text-slate-100">{tasks} total</strong>, 1 running</p>
        <p>Load Average: <strong className="text-emerald-600 dark:text-emerald-400">0.42 0.38 0.35</strong></p>
        <p>Uptime: <strong className="text-cyan-600 dark:text-cyan-400">14 days, 06:42:10</strong></p>
      </div>

      {/* Process Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] font-mono">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 bg-slate-100 dark:bg-slate-950">
              <th className="py-1.5 px-2">PID</th>
              <th className="py-1.5 px-2">USER</th>
              <th className="py-1.5 px-2">%CPU</th>
              <th className="py-1.5 px-2">MEM</th>
              <th className="py-1.5 px-2">COMMAND</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
            {processList.map((p) => (
              <tr key={p.pid} className="hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300">
                <td className="py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">{p.pid}</td>
                <td className="py-1.5 px-2 text-emerald-600 dark:text-emerald-400 font-semibold">{p.user}</td>
                <td className="py-1.5 px-2 font-bold text-cyan-600 dark:text-cyan-400">{p.cpu}%</td>
                <td className="py-1.5 px-2 text-purple-600 dark:text-purple-400">{p.mem}</td>
                <td className="py-1.5 px-2 text-slate-600 dark:text-slate-400 font-mono">{p.command}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
