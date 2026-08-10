"use client";



export default function AddTaskButton() {
  return (
    <button
      className="
        flex items-center gap-2
        rounded-2xl
        bg-gradient-to-r
        from-indigo-500
        to-violet-500
        px-5
        py-3
        font-semibold
        text-white
        shadow-lg
        shadow-indigo-500/30
        transition
        hover:scale-105
      "
    >
      
      New Task
    </button>
  );
}