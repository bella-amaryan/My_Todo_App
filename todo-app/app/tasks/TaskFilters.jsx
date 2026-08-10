"use client";


const PRIORITIES = [
  { value: "All", label: " ⚪ All Priorities" },
  { value: "High", label: "🔴 High" },
  { value: "Medium", label: "🟡 Medium"},
  { value: "Low", label: "🟢 Low" }
];

const CATEGORIES = [
  { value: "All", label: " 📁 All Categories"},
  { value: "Work", label:" 💼 Work"  },
  { value: "Personal", label: "🏠Personal" },
  { value: "Study", label: " 📚 Study" },
  {value:"Fitness",label:"🏋️‍♂️ Fitness"},
];

const SORT_OPTIONS = [
  { value: "newest", label: " 🆕 Newest" },
  { value: "oldest", label: " ⏳ Oldest" },
  { value: "priority", label: " 🚩Priority" },
  { value: "dueDate", label: " 📅 Due Date" },
];

export default function TaskFilters({
  priority,
  setPriority,
  category,
  setCategory,
  sort,
  setSort,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="rounded-2xl px-4 py-2 text-sm border border-black/10 dark:border-white/10  dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:border-indigo-500"
      >
        {PRIORITIES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-2xl px-4 py-2 text-sm border border-black/10 dark:border-white/10  dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:border-indigo-500"
      >
        {CATEGORIES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-2xl px-4 py-2 text-sm border border-black/10 dark:border-white/10  dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:border-indigo-500"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
