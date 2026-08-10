"use client";

import { ClipboardList } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      
      {/* Icon */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl  dark:bg-slate-900">
        <ClipboardList className="h-7 w-7 text-slate-400" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        No Tasks Yet
      </h2>

      {/* Subtitle */}
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Create your first task and start organizing your day.
      </p>
    </div>
  );
}