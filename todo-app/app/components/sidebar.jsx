"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Heart,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Statistics", href: "/statistics", icon: BarChart3 },
    //{ name: "Habits", href: "/habits", icon: Heart },
    //{ name: "Notes", href: "/notes", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col border-r border-black/10 dark:border-white/10   px-6 py-8">

      {/* LOGO */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-600 shadow-lg shadow-yellow-500/30">
          <Sparkles className="h-6 w-6 text-white" />
        </div>

        <div>
          <p className="text-5sm  text-blue-800 font-semibold">FocusFlow</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Unlock productivity
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="space-y-2 text-sm">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-2xl px-4 py-3 transition
                ${
                  isActive
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800"
                }
              `}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}

        

          </nav>
    </aside>
  );
}