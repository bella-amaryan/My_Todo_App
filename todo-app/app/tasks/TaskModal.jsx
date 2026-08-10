"use client";

import { useState } from "react";

const PRIORITIES = ["High", "Medium", "Low"];
const CATEGORIES = ["Work", "Personal", "Study", "General","Fitness"];

export default function CreateTaskModal({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("General");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          dueDate,
          priority,
          category,
        }),
      });

      const newTask = await res.json();

      if (!res.ok) {
        throw new Error(newTask?.message || "Could not create task");
      }

      onAdd(newTask);
      setTitle("");
      setDueDate("");
      setPriority("Low");
      setCategory("General");
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold 
        text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        + New Task
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-900/10 dark:bg-slate-950"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Add New Task
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Add a task, due date, priority and category.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Task title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Create a new task..."
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10
             bg-white dark:bg-slate-900
             text-slate-900 dark:text-white
             placeholder:text-slate-400
             px-4 py-3 text-sm outline-none
             focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10
             bg-white dark:bg-slate-900
             text-slate-900 dark:text-white
             placeholder:text-slate-400
             px-4 py-3 text-sm outline-none
             focus:border-indigo-500"
                >
                  {PRIORITIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10
             bg-white dark:bg-slate-900
             text-slate-900 dark:text-white
             placeholder:text-slate-400
             px-4 py-3 text-sm outline-none
             focus:border-indigo-500"
                >
                  {CATEGORIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Due date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10
             bg-white dark:bg-slate-900
             text-slate-900 dark:text-white
             placeholder:text-slate-400
             px-4 py-3 text-sm outline-none
             focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-600 disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Create task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
