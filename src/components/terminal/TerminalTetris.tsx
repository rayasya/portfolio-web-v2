"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, RotateCcw, Trophy } from "lucide-react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 18;

// Tetromino definitions
const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: "bg-cyan-500 shadow-[0_0_8px_#06b6d4]" },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "bg-blue-500 shadow-[0_0_8px_#3b82f6]" },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "bg-amber-500 shadow-[0_0_8px_#f59e0b]" },
  O: { shape: [[1, 1], [1, 1]], color: "bg-yellow-400 shadow-[0_0_8px_#facc15]" },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "bg-emerald-500 shadow-[0_0_8px_#10b981]" },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "bg-purple-500 shadow-[0_0_8px_#a855f7]" },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "bg-rose-500 shadow-[0_0_8px_#f43f5e]" },
};

type TetrominoKey = keyof typeof TETROMINOES;

const getRandomTetromino = (): { key: TetrominoKey; shape: number[][]; color: string } => {
  const keys = Object.keys(TETROMINOES) as TetrominoKey[];
  const key = keys[Math.floor(Math.random() * keys.length)];
  return { key, ...TETROMINOES[key] };
};

export default function TerminalTetris() {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(""))
  );
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    color: string;
    x: number;
    y: number;
  } | null>(null);

  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const spawnPiece = useCallback(() => {
    const next = getRandomTetromino();
    const startX = Math.floor((BOARD_WIDTH - next.shape[0].length) / 2);
    const piece = { shape: next.shape, color: next.color, x: startX, y: 0 };

    // Check game over
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] && grid[r][startX + c]) {
          setGameOver(true);
          setIsPlaying(false);
          return;
        }
      }
    }
    setCurrentPiece(piece);
  }, [grid]);

  const startGame = () => {
    setGrid(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill("")));
    setScore(0);
    setLines(0);
    setGameOver(false);
    setIsPlaying(true);
    spawnPiece();
  };

  const checkCollision = (piece: typeof currentPiece, offsetPos = { x: 0, y: 0 }) => {
    if (!piece) return true;
    const { shape, x, y } = piece;
    const newX = x + offsetPos.x;
    const newY = y + offsetPos.y;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const targetY = newY + r;
          const targetX = newX + c;

          if (targetX < 0 || targetX >= BOARD_WIDTH || targetY >= BOARD_HEIGHT) {
            return true;
          }
          if (targetY >= 0 && grid[targetY][targetX]) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const mergePieceToGrid = useCallback(() => {
    if (!currentPiece) return;
    const newGrid = grid.map((row) => [...row]);
    const { shape, color, x, y } = currentPiece;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          if (y + r >= 0) {
            newGrid[y + r][x + c] = color;
          }
        }
      }
    }

    // Check cleared lines
    let cleared = 0;
    const filteredGrid = newGrid.filter((row) => {
      const isFull = row.every((cell) => cell !== "");
      if (isFull) cleared++;
      return !isFull;
    });

    while (filteredGrid.length < BOARD_HEIGHT) {
      filteredGrid.unshift(Array(BOARD_WIDTH).fill(""));
    }

    if (cleared > 0) {
      setScore((s) => s + cleared * 100);
      setLines((l) => l + cleared);
    }

    setGrid(filteredGrid);
    spawnPiece();
  }, [currentPiece, grid, spawnPiece]);

  const moveDown = useCallback(() => {
    if (!currentPiece || !isPlaying || gameOver) return;
    if (!checkCollision(currentPiece, { x: 0, y: 1 })) {
      setCurrentPiece((prev) => (prev ? { ...prev, y: prev.y + 1 } : null));
    } else {
      mergePieceToGrid();
    }
  }, [currentPiece, isPlaying, gameOver, mergePieceToGrid]);

  const moveHorizontal = (dir: number) => {
    if (!currentPiece || !isPlaying || gameOver) return;
    if (!checkCollision(currentPiece, { x: dir, y: 0 })) {
      setCurrentPiece((prev) => (prev ? { ...prev, x: prev.x + dir } : null));
    }
  };

  const rotatePiece = () => {
    if (!currentPiece || !isPlaying || gameOver) return;
    const shape = currentPiece.shape;
    const rotated = shape[0].map((_, index) => shape.map((row) => row[index]).reverse());

    const rotatedPiece = { ...currentPiece, shape: rotated };
    if (!checkCollision(rotatedPiece)) {
      setCurrentPiece(rotatedPiece);
    }
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const timer = setInterval(moveDown, 600);
    return () => clearInterval(timer);
  }, [isPlaying, gameOver, moveDown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      if (e.key === "ArrowLeft" || e.key === "a") moveHorizontal(-1);
      if (e.key === "ArrowRight" || e.key === "d") moveHorizontal(1);
      if (e.key === "ArrowDown" || e.key === "s") moveDown();
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") rotatePiece();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver, currentPiece]);

  // Combine grid with current active piece for display
  const displayGrid = grid.map((row) => [...row]);
  if (currentPiece) {
    const { shape, color, x, y } = currentPiece;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] && y + r >= 0 && y + r < BOARD_HEIGHT && x + c >= 0 && x + c < BOARD_WIDTH) {
          displayGrid[y + r][x + c] = color;
        }
      }
    }
  }

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 font-mono text-xs shadow-md dark:shadow-xl space-y-4 max-w-sm mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1.5">
          🧩 Terminal Tetris v1.0
        </span>
        <div className="flex items-center gap-3 text-[11px]">
          <span>Score: <strong className="text-cyan-600 dark:text-cyan-400">{score}</strong></span>
          <span>Lines: <strong className="text-emerald-600 dark:text-emerald-400">{lines}</strong></span>
        </div>
      </div>

      <div className="relative aspect-[10/18] w-full bg-slate-950 rounded-lg border border-slate-800 p-1 flex items-center justify-center overflow-hidden">
        <div className="grid w-full h-full gap-0.5" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))` }}>
          {displayGrid.map((row, rIdx) =>
            row.map((cellColor, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                className={`rounded-xs transition-colors ${cellColor || "bg-slate-900/40"}`}
              />
            ))
          )}
        </div>

        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 p-4 text-center">
            {gameOver ? (
              <div className="space-y-1">
                <p className="text-rose-400 font-bold text-sm">GAME OVER!</p>
                <p className="text-slate-300 text-xs">Final Score: {score}</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-cyan-400 font-bold text-sm">Tetris Challenge</p>
                <p className="text-slate-400 text-[11px]">Arrow keys / WASD to move & rotate</p>
              </div>
            )}
            <button
              type="button"
              onClick={startGame}
              className="rounded bg-cyan-500 text-slate-950 px-4 py-1.5 font-bold hover:bg-cyan-400 transition-colors flex items-center gap-1.5 text-xs shadow-lg"
            >
              {gameOver ? <RotateCcw className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {gameOver ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
