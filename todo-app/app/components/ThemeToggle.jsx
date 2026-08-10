"use client";

import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, setDarkMode, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        rounded-lg
        border
        border-slate-300
        bg-white
        px-3
        py-2
        shadow
        transition
        hover:bg-slate-100
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-white
        dark:hover:bg-slate-700
      "
    >
      {darkMode ? "☀️" : "🌙 "}
    </button>
  );
}