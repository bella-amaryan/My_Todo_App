"use client";
import { useEffect, useMemo, useState } from "react";
import TaskHeader from "./TaskHeader";
import SearchTasks from "./SearchTasks";
import TaskTabs from "./TaskTabs";
import TaskFilters from "./TaskFilters";
import TaskList from "./TaskList";
import CreateTaskModal from "./TaskModal";

 

export default function TasksPage() {
  
  const [allTasks, setAllTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 

  // Fetch all tasks (no filters)
  const fetchAllTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/todos");

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Unable to load tasks");
      }

      const data = await response.json();
      const tasks = data.data || [];
      setAllTasks(tasks);
      
      // Apply filters after fetching
      
    } catch (err) {
      setError(err.message || "Something went wrong");
    setAllTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to tasks
  const filteredTasks =useMemo (() => {
    let filtered = [...allTasks];

    // Filter by search
    if (search.trim()) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((t) =>
        status === "completed" ? t.completed : !t.completed
      );
    }

    // Filter by priority
    if (priority !== "All") {
      filtered = filtered.filter((t) => t.priority === priority);
    }

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((t) => t.category === category);
    }

    // Sort
    switch (sort) {
    case "newest":
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;

    case "oldest":
      filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;

    case "priority": {
      const order = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      filtered.sort(
        (a, b) => (order[b.priority] || 0) - (order[a.priority] || 0)
      );
      break;
    }

    case "dueDate":
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      break;
  }

return filtered;
}, [allTasks, search, status, priority, category, sort]);

useEffect(() => {
  fetchAllTasks();

  const handleFocus = () => {
    fetchAllTasks();
  };

  window.addEventListener("focus", handleFocus);

  return () => {
    window.removeEventListener("focus", handleFocus);
  };
}, []);

const addTask = () => {
  fetchAllTasks();
};

  return (
  <div className="min-h-screen  from-slate-50 via-white to-purple-50 p-6 md:p-10">

    {/* Top navigation */}


{/* Header + Search */}
    
      <div className="flex flex-col gap-6">

<TaskHeader />
        
        </div>

        <div className=" flex justify-end items-center gap-4 mb-6">
          <CreateTaskModal onAdd={addTask} />
          </div>
          

        


    {/* Filters */}
    <div
      className="
      w-160
      mb-6 rounded-3xl
      p-5
        shadow-xl
        border border-slate-100
        
        
      "
    >

      <div className="
        flex flex-col gap-5
        lg:flex-row
        lg:items-center
        lg:justify-between
      ">

        <TaskTabs
          status={status}
          setStatus={setStatus}
        />
        </div>
        </div>
        
        

        <div
      className="
      w-130
      ml-auto
      -mt-25
      mb-6 rounded-3xl
      p-5
        shadow-xl
        border border-slate-100
        
        
      "
    >

      <div className="
        flex flex-col gap-3
        lg:flex-row
        lg:items-center
        lg:justify-between
      ">


        <TaskFilters
          priority={priority}
          setPriority={setPriority}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />
        </div>
        </div>

    
      
  {/* Task overview */}
    <div
      className="
        rounded-3xl
        w-full
        
        p-6
        shadow-xl
        border border-slate-100
      "
    >

     
<div className="space-y-4">
        <div>
          <h2 className="
            text-3xl
            font-bold
            text-blue-900
          ">
            Tasks Overview
          </h2>

          <p className="mt-1 text-4sm text-slate-500">
            {filteredTasks.length === 0
              ? "No tasks yet"
              : `You have ${filteredTasks.length} active task${filteredTasks.length !== 1 ? "s" : ""}`
            }
          </p>
          <div className=" flex justify-center items-center gap-4 mb-6">
          <div className="w-50 -mt-15">
            <SearchTasks
              search={search}
              setSearch={setSearch}
            />
            </div>
            </div>
        </div>


      {error ? (

          <div
            className="
              rounded-2xl
              bg-red-50
              p-4
              text-red-600
            "
          >
            {error}
          </div>


        ) : loading ? (

          <div
            className="
              flex justify-center
              py-10
              text-slate-500
              
            "
          >
            Loading tasks...
          </div>


        ) : (

          <TaskList
            tasks={filteredTasks}
            setTasks={setAllTasks}
            refetch={fetchAllTasks}
          />

        )}

      </div>
      </div>


  </div>
)
}