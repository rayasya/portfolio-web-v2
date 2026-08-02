"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Zap, Target } from "lucide-react";

const CODE_SNIPPETS = [
  "const asyncFetch = async () => await db.query.projects.findMany();",
  "export default function App() { return <TerminalWorkspace />; }",
  "SELECT id, title, tech_stack FROM projects WHERE featured = true;",
  "docker run -d -p 3000:3000 --name portfolio ray-app:latest",
];

export default function TerminalTypingTest() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typedInput, setTypedInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const targetCode = CODE_SNIPPETS[snippetIndex];

  const startTest = () => {
    setTypedInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setIsPlaying(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) return;
    const value = e.target.value;
    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    setTypedInput(value);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === targetCode[i]) correct++;
    }
    const acc = value.length > 0 ? Math.round((correct / value.length) * 100) : 100;
    setAccuracy(acc);

    // Calculate WPM
    if (startTime) {
      const timeElapsedInMinutes = (Date.now() - startTime) / 60000;
      const wordsTyped = value.length / 5;
      const calculatedWpm = timeElapsedInMinutes > 0 ? Math.round(wordsTyped / timeElapsedInMinutes) : 0;
      setWpm(calculatedWpm);
    }

    // Check completed
    if (value === targetCode) {
      setIsCompleted(true);
      setIsPlaying(false);
    }
  };

  const nextSnippet = () => {
    setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
    startTest();
  };

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 font-mono text-xs shadow-md dark:shadow-xl space-y-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
          ⌨️ Developer Typing Speed Test v1.0
        </span>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <Zap className="h-3.5 w-3.5" /> WPM: {wpm}
          </span>
          <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-bold">
            <Target className="h-3.5 w-3.5" /> Accuracy: {accuracy}%
          </span>
        </div>
      </div>

      {/* Target Code Snippet View */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">// TYPE THIS CODE SNIPPET:</p>
        <div className="text-xs sm:text-sm font-mono leading-relaxed break-all select-none">
          {targetCode.split("").map((char, i) => {
            let charColor = "text-slate-500";
            if (i < typedInput.length) {
              charColor = typedInput[i] === char ? "text-emerald-400 font-bold bg-emerald-500/20" : "text-rose-400 font-bold bg-rose-500/20 underline";
            }
            return (
              <span key={i} className={charColor}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Active Input Line */}
      {isPlaying ? (
        <div className="space-y-2">
          <input
            ref={inputRef}
            type="text"
            value={typedInput}
            onChange={handleInputChange}
            placeholder="Start typing here..."
            className="w-full bg-slate-100 dark:bg-slate-950 p-3 rounded-lg border border-emerald-500/50 text-slate-900 dark:text-slate-100 text-xs font-mono focus:outline-none"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      ) : (
        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
          <span className="text-slate-600 dark:text-slate-400 text-[11px]">
            {isCompleted ? "🎉 Snippet Completed!" : "Ready to test your typing speed?"}
          </span>
          <div className="flex gap-2">
            {isCompleted && (
              <button
                type="button"
                onClick={nextSnippet}
                className="rounded bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:text-emerald-400 transition-colors"
              >
                Next Snippet ⏭
              </button>
            )}
            <button
              type="button"
              onClick={startTest}
              className="rounded bg-emerald-500 text-slate-950 px-4 py-1.5 font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1.5 text-xs shadow-md"
            >
              {isCompleted ? <RotateCcw className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {isCompleted ? "Try Again" : "Start Test"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
