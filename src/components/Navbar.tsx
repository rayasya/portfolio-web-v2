"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 border-b backdrop-blur-sm"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg"
          style={{ color: "var(--accent)" }}
        >
          ray.dev
        </Link>

        <div className="flex items-center gap-6">
          <a
            href="#projects"
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            projects
          </a>
          <a
            href="#certificates"
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            achievements
          </a>
          <a
            href="#contact"
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            contact
          </a>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-sm px-3 py-1 rounded-full border"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
            >
              {theme === "dark" ? "☀️ light" : "🌙 dark"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
