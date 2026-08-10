"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Footer from "../Footer/page";


export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get current week's date range
  const getCurrentWeekDateRange = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay(); // First day (Sunday) of current week
    
    const weekStart = new Date(today.setDate(first));
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    
    return { weekStart, weekEnd };
  };

  const { weekStart, weekEnd } = getCurrentWeekDateRange();

  const weeklyData = days.map((day) => ({
    day,
    value: 0,
  }));

  todos.forEach((todo) => {
    if (!todo.completed) return;

    const date = new Date(todo.createdAt);
    
    // Only count tasks completed in the current week
    if (date >= weekStart && date < weekEnd) {
      const dayIndex = date.getDay();
      weeklyData[dayIndex].value++;
    }
  });

  // Calculate upcoming tasks (due within next 7 days)
  const getUpcomingTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    return todos.filter((todo) => {
      if (!todo.dueDate || todo.completed) return false;
      
      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      
      return dueDate >= today && dueDate <= sevenDaysFromNow;
    });
  };

  const upcomingTasks = getUpcomingTasks();
  const overdueTasks = todos.filter((todo) => {
    if (!todo.dueDate || todo.completed) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  });

  // Calculate tasks created today
  const getTodayCount = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return todos.filter((todo) => {
      const createdDate = new Date(todo.createdAt);
      createdDate.setHours(0, 0, 0, 0);
      
      return createdDate >= today && createdDate < tomorrow;
    }).length;
  };

  const todayCount = getTodayCount();

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
      
      if (!res.ok) {
        console.error("Failed to delete todo");
        return;
      }
      
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

      });

    if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to toggle todo:", errorData);
        return;
      }
      
      
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const today = new Date().toLocaleDateString("en-GB")
  const completedTasks = todos.filter(todo => todo.completed).length;

  const progress =
    todos.length === 0
      ? 0
      : Math.round((completedTasks / todos.length) * 100);

  return (
    <main className="min-h-screen   border border-slate-500 text-slate-900  dark:text-slate-100 transition-colors duration-300">
      <div className="space-y-6 ">

        {/* TODAY SECTION */}
        <section className="rounded-[2rem]  p-4 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">
              <h1 className=" text-2xl uppercase tracking-[0.35em] text-cyan-500 ">
                Today
              </h1>

              <div className="mt-2 inline-block rounded-full bg-white dark:bg-slate-950 px-4 py-2 text-sm text-slate-900 dark:text-slate-200">
                {today}
              </div>

              <h3 className="mt-3  text-slate-500 text-2xl font-semibold">
                Today’s Focus
              </h3>

              <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-400">
                "Discipline is the bridge between goals and accomplishment."
                <br /> - Jim Rohn
              </p>
            </div>

           <img src="/images/target.png" className="h-40 w-40 "/>
            
            </div>
          
        </section>

        {/* MAIN GRID */}
        <section className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">

          {/* LEFT */}
          <div className="space-y-6">

            <div className="rounded-[2rem]   p-6 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h3 className="text-2xl text-slate-500  font-semibold">
                  Tasks list
                </h3>

                <div className="rounded-full  dark:bg-slate-950  px-4 py-2 text-sm">
                  {progress}% done
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-300 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-6 space-y-4">

                {/* SEARCH */}
                <div className="rounded-3xl border border-slate-300    p-4">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tasks..."
                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-800  px-4 py-3 text-slate-500 dark:text-slate-500 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* FORM */}
                <div className="rounded-[1.75rem] border border-slate-500   p-5 shadow-inner">
                  <TodoForm addTodo={addTodo} />
                </div>

                {/* LIST */}
                <TodoList
                  todos={filteredTodos}
                  deleteTodo={deleteTodo}
                  toggleTodo={toggleTodo}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">

            {/* WEEK STATS */}
            <div className="rounded-[2rem]   p-6 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">

              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">
                This week
              </h3>

              <h3 className="mt-2 text-2xl  text-slate-500 font-semibold">
                {Math.max(0, todos.length)} tasks
              </h3>

              <span className="inline-block mt-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-400">
                +{todayCount} today
              </span>

              {/* CHART */}
              <div className="mt-6 flex h-44 items-end justify-between gap-4">
                {weeklyData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: `${Math.max(item.value * 28, 12)}px`,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.08,
                      }}
                      className="w-9 rounded-t-2xl bg-gradient-to-t from-blue-600 via-sky-500 to-cyan-300 shadow-lg shadow-blue-500/30"
                    />
                    <span className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>

              {/* INFO CARDS */}
              <div className="mt-6 grid gap-3">

                <div className="rounded-3xl  border border-slate-500 p-4">
                  <p className="text-sm text-slate-500">Upcoming</p>
                  <p className="mt-2 text-lg  text-slate-500 font-semibold">
                    {upcomingTasks.length} {upcomingTasks.length === 1 ? 'deadline' : 'deadlines'}
                  </p>
                  {upcomingTasks.length > 0 && (
                    <p className="mt-2 text-xs text-slate-500">
                      Due in the next 7 days
                    </p>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-500 p-4">
                  <p className="text-sm text-slate-500">Completed</p>
                  <p className="mt-2 text-lg text-slate-500 font-semibold">
                    {todos.filter((t) => t.completed).length} done
                  </p>
                </div>

                {overdueTasks.length > 0 && (
                  <div className="rounded-3xl bg-rose-50 dark:bg-rose-900/20 p-4 border border-rose-200 dark:border-rose-800">
                    <p className="text-sm text-rose-600 dark:text-rose-400">⚠️ Overdue</p>
                    <p className="mt-2 text-lg font-semibold text-rose-700 dark:text-rose-300">
                      {overdueTasks.length} {overdueTasks.length === 1 ? 'task' : 'tasks'}
                    </p>
                  </div>
                )}

              </div>
            </div>
          </aside>

        </section>

        <Footer />

      </div>
    </main>
  );
}