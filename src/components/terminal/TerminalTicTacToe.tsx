"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw, Bot, User } from "lucide-react";

type Board = (string | null)[];

export default function TerminalTicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: Board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((s) => s !== null)) return "DRAW";
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setIsXNext(false);
    }
  };

  // AI Move (O)
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((val): val is number => val !== null);

        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = [...board];
          newBoard[randomIndex] = "O";
          setBoard(newBoard);

          const win = calculateWinner(newBoard);
          if (win) setWinner(win);
          setIsXNext(true);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 font-mono text-xs shadow-md dark:shadow-xl space-y-4 max-w-xs mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
          🤖 Tic-Tac-Toe vs AI Bot
        </span>
        <span className="text-[10px] text-slate-500 font-bold">X (You) vs O (AI)</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
        {board.map((cell, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleClick(idx)}
            className={`aspect-square rounded-md border border-slate-800 text-xl font-bold flex items-center justify-center transition-colors ${
              cell === "X"
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/40"
                : cell === "O"
                ? "text-rose-400 bg-rose-500/10 border-rose-500/40"
                : "hover:bg-slate-800 text-transparent"
            }`}
          >
            {cell || "-"}
          </button>
        ))}
      </div>

      {/* Status Footer */}
      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
        <span className="text-[11px] font-bold">
          {winner === "X" ? (
            <span className="text-emerald-500">🎉 YOU WON!</span>
          ) : winner === "O" ? (
            <span className="text-rose-500">🤖 AI WON!</span>
          ) : winner === "DRAW" ? (
            <span className="text-amber-500">🤝 DRAW GAME!</span>
          ) : isXNext ? (
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1"><User className="h-3 w-3 text-emerald-500" /> Your turn</span>
          ) : (
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1"><Bot className="h-3 w-3 text-rose-500 animate-spin" /> AI thinking...</span>
          )}
        </span>

        <button
          type="button"
          onClick={resetGame}
          className="rounded bg-slate-800 text-slate-200 px-3 py-1 font-bold hover:text-emerald-400 transition-colors text-xs flex items-center gap-1"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>
    </div>
  );
}
