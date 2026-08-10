"use client";

import { Search } from "lucide-react";

export default function SearchTasks({ search, setSearch }) {
  return (
    <div className="relative  w-80">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="w-full  rounded-2xl border border-slate-300  py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-black-800 
        placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
      />
    </div>
  );
}
