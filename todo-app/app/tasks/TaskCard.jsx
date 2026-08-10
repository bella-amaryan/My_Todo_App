"use client";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="border border-gray-800
rounded-2xl
p-4
hover:border-purple-500
transition
cursor-pointer
">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* checkbox */}
        <input
          type="checkbox"
          checked={task.completed ?? false}
          onChange={() => onToggle(task._id)}
          className="h-5 w-5  rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500"
        />
       

        {/* text */}
        <div>
          <p className={`font-medium ${
            task.completed  ?? false ? "line-through text-slate-400" : "text-slate-900 dark:text-white"
          }`}>
            {task.title}
          </p>

          <p className="text-xs text-slate-500">
            {task.priority || "Low"} • {task.category || "General"}
          </p>

          {task.dueDate && (
            <p className="text-xs text-indigo-500 mt-1">
              Due: {new Date(task.dueDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex justify-end ">
      <button
        onClick={() => onDelete(task._id)}
        className="text-sm  text-red-500 hover:text-red-600"
      >
        Delete
      </button>
      </div>
    </div>
  );
}