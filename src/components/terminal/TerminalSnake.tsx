"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, RotateCcw, Trophy } from "lucide-react";

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 15;
const INITIAL_SNAKE: Position[] = [
  { x: 7, y: 7 },
  { x: 7, y: 8 },
  { x: 7, y: 9 },
];
const INITIAL_FOOD: Position = { x: 4, y: 4 };

export default function TerminalSnake() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [dir, setDir] = useState<Direction>("UP");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDir("UP");
    setScore(0);
    setGameOver(false);
    setFood(generateFood(INITIAL_SNAKE));
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        switch (dir) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
        }

        // Wall Collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Self Collision
        if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Food Collision
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) setHighScore(nextScore);
            return nextScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const timer = setInterval(moveSnake, 130);
    return () => clearInterval(timer);
  }, [dir, food, gameOver, isPlaying, generateFood, highScore]);

  // Handle Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (dir !== "DOWN") setDir("UP");
          e.preventDefault();
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (dir !== "UP") setDir("DOWN");
          e.preventDefault();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (dir !== "RIGHT") setDir("LEFT");
          e.preventDefault();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (dir !== "LEFT") setDir("RIGHT");
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dir, isPlaying, gameOver]);

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 font-mono text-xs shadow-md dark:shadow-xl space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
          🐍 Terminal Snake Game v1.0
        </span>
        <div className="flex items-center gap-3 text-[11px]">
          <span>Score: <strong className="text-emerald-600 dark:text-emerald-400">{score}</strong></span>
          <span className="flex items-center gap-1 text-amber-500 font-bold">
            <Trophy className="h-3 w-3" /> High: {highScore}
          </span>
        </div>
      </div>

      {/* Grid Canvas Board */}
      <div className="relative aspect-square w-full bg-slate-950 rounded-lg border border-slate-800 p-1 flex items-center justify-center overflow-hidden">
        <div
          className="grid w-full h-full gap-0.5"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);

            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = snake.slice(1).some((s) => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={idx}
                className={`rounded-sm transition-colors ${
                  isHead
                    ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                    : isBody
                    ? "bg-emerald-600/80"
                    : isFood
                    ? "bg-rose-500 animate-pulse rounded-full shadow-[0_0_8px_#f43f5e]"
                    : "bg-slate-900/40"
                }`}
              />
            );
          })}
        </div>

        {/* Start / Game Over Overlay */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 p-4 text-center">
            {gameOver ? (
              <div className="space-y-1">
                <p className="text-rose-400 font-bold text-sm">GAME OVER!</p>
                <p className="text-slate-300 text-xs">Final Score: {score}</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-emerald-400 font-bold text-sm">Ready to Play?</p>
                <p className="text-slate-400 text-[11px]">Use Arrow Keys or W/A/S/D to move</p>
              </div>
            )}

            <button
              type="button"
              onClick={resetGame}
              className="rounded bg-emerald-500 text-slate-950 px-4 py-1.5 font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1.5 text-xs shadow-lg"
            >
              {gameOver ? <RotateCcw className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {gameOver ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>

      {/* D-Pad Buttons for Mobile / Touch Users */}
      <div className="flex flex-col items-center gap-1 sm:hidden pt-1">
        <button
          type="button"
          onClick={() => isPlaying && dir !== "DOWN" && setDir("UP")}
          className="rounded bg-slate-800 px-4 py-1 text-slate-200 border border-slate-700"
        >
          ▲
        </button>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => isPlaying && dir !== "RIGHT" && setDir("LEFT")}
            className="rounded bg-slate-800 px-4 py-1 text-slate-200 border border-slate-700"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => isPlaying && dir !== "LEFT" && setDir("RIGHT")}
            className="rounded bg-slate-800 px-4 py-1 text-slate-200 border border-slate-700"
          >
            ▶
          </button>
        </div>
        <button
          type="button"
          onClick={() => isPlaying && dir !== "UP" && setDir("DOWN")}
          className="rounded bg-slate-800 px-4 py-1 text-slate-200 border border-slate-700"
        >
          ▼
        </button>
      </div>
    </div>
  );
}
