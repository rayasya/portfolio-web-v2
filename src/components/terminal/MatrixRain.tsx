"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\{}[]~RAYFULLSTACK";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 flex flex-col justify-between p-4">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex justify-between items-center bg-slate-900/90 p-3 rounded-lg border border-emerald-500/50 backdrop-blur max-w-xl mx-auto w-full shadow-2xl">
        <span className="text-emerald-400 font-bold font-mono text-xs flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          MATRIX RAIN INITIALIZED // Press ESC to return
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded bg-rose-500/20 border border-rose-500/50 px-3 py-1 text-xs text-rose-400 font-mono font-bold hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-1"
        >
          <X className="h-3.5 w-3.5" /> Exit Matrix
        </button>
      </div>
    </div>
  );
}
