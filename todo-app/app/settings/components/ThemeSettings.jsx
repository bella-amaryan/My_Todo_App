"use client";

import { useTheme } from "../../context/ThemeContext";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ThemeSettings() {
    const router = useRouter();
  const { darkMode, setDarkMode, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">

          <button
            onClick={() => router.push("/settings")}
             className="
    group
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    border
    border-slate-700
    text-slate-400
    transition-all
    hover:-translate-x-1
    hover:bg-purple-500/20
    hover:text-purple-400
            "
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h2 className="text-3xl text-purple-900 font-bold">
              Theme
            </h2>

            <p className="text-slate-400 text-sm-10">
              Choose how your app looks.
            </p>
          </div>

        </div>


        {/* Theme Settings */}
        <div className="
          rounded-2xl
          border
          border-slate-800
          
          p-6
          space-y-4
        ">

          


          {/* Light Mode */}
          <label
            className="
            
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-700
              p-4
              cursor-pointer
              text-slate-500
              
              hover:border-purple-500
              transition
            "
          >
            <span>
              ☀️ Light
            </span>

            <input
              type="radio"
              checked={!darkMode}
              onChange={() => setDarkMode(false)}
            />
          </label>


          {/* Dark Mode */}
          <label
            className="
              flex
              items-center
              justify-between
              rounded-xl
              text-slate-500
              border
              border-slate-700
              p-4
              cursor-pointer
              hover:border-purple-500
              transition
            "
          >
            <span>
              🌙 Dark
            </span>

            <input
              type="radio"
              checked={darkMode}
              onChange={() => setDarkMode(true)}
            />
          </label>


        </div>

      </div>
    </div>
  );
}