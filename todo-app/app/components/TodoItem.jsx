export default function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-800  p-4 shadow-sm transition hover:border-indigo-500/40">
      <label className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleTodo}
          className="h-5 w-5 rounded border-slate-700  text-indigo-500 focus:ring-indigo-500"
        />
        <span
          className={
            todo.completed
              ? "text-sm font-medium text-slate-500 line-through"
              : "text-sm font-medium text-slate-500"
          }
        >
          {todo.title}
        </span>
      </label>

      <button
        onClick={deleteTodo}
        className="rounded-2xl bg-slate-900/80 px-4 py-2 text-sm text-rose-300 transition hover:bg-rose-500/10"
      >
        Delete
      </button>
    </div>
  );
}
