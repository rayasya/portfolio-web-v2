"use client";

import { useState } from "react";
import { Play, RotateCcw, CheckCircle2, XCircle, Award } from "lucide-react";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const QUIZ_QUESTIONS: Question[] = [
  {
    question: "Manakah fitur utama yang diperkenalkan di React 19?",
    options: ["Server Actions & React Compiler", "Class Components", "Redux Core", "jQuery Integration"],
    answer: 0,
    explanation: "React 19 memperkenalkan Server Actions bawaan & integrasi React Compiler.",
  },
  {
    question: "Apa fungsi utama dari ORM seperti Drizzle atau Prisma?",
    options: ["Menggambar UI", "Memetakan objek TypeScript ke database SQL", "Membuat file PDF", "Menjalankan Docker"],
    answer: 1,
    explanation: "ORM memetakan tipe data TypeScript secara type-safe ke skema database SQL.",
  },
  {
    question: "Mengapa NeonDB populer di Next.js App Router?",
    options: ["Serverless PostgreSQL dengan instant branching & scaling", "Database NoSQL tanpa skema", "Browser extension", "Bahasa pemograman baru"],
    answer: 0,
    explanation: "NeonDB menyediakan PostgreSQL serverless dengan fitur instant database branching.",
  },
];

export default function TerminalQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    if (optionIdx === currentQ.answer) {
      setScore((s) => s + 100);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((c) => c + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 font-mono text-xs shadow-md dark:shadow-xl space-y-4 max-w-md mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1.5">
          🧠 Fullstack Engineering Trivia Quiz
        </span>
        <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
          <Award className="h-3.5 w-3.5" /> Score: {score}
        </span>
      </div>

      {!isCompleted ? (
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
          </div>

          <p className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
            {currentQ.question}
          </p>

          <div className="space-y-2 pt-1">
            {currentQ.options.map((opt, optIdx) => {
              let btnStyle = "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-500";
              if (selectedOption !== null) {
                if (optIdx === currentQ.answer) {
                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold";
                } else if (optIdx === selectedOption) {
                  btnStyle = "bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400 font-bold";
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelect(optIdx)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-colors flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && optIdx === currentQ.answer && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                  {selectedOption !== null && optIdx === selectedOption && optIdx !== currentQ.answer && (
                    <XCircle className="h-4 w-4 text-rose-500" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                💡 {currentQ.explanation}
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="w-full rounded bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 transition-colors text-xs shadow-md"
              >
                {currentIdx + 1 === QUIZ_QUESTIONS.length ? "Finish Quiz 🏆" : "Next Question ➔"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-950 p-5 rounded-lg text-center space-y-3">
          <Award className="h-10 w-10 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-emerald-400 font-bold text-base">Quiz Completed!</h4>
          <p className="text-slate-300 text-xs">Total Score: <strong className="text-amber-400 text-sm">{score} / {QUIZ_QUESTIONS.length * 100}</strong></p>
          <button
            type="button"
            onClick={restartQuiz}
            className="rounded bg-emerald-500 text-slate-950 font-bold px-4 py-2 hover:bg-emerald-400 transition-colors text-xs inline-flex items-center gap-1.5 shadow-lg"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}
