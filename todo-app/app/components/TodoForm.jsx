"use client";
import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Create a new task"
        className="flex-1 rounded-3xl border border-slate-800  px-4 py-3 text-slate-500 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
      />
      <button className="rounded-3xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">
        Add Task
      </button>
    </form>
  );
}
