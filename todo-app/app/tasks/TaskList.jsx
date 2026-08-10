"use client"
import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

export default function TaskList({ tasks, setTasks, refetch }) {
  const toggleTask = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: "PUT" });

      if (!res.ok) {
        console.error("Failed to toggle task");
        return;
      }

      if (refetch) {
        await refetch();
      } else {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, completed: !t.completed } : t
          )
        );
      }
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
      
      if (!res.ok) {
        console.error("Failed to delete task");
        return;
      }

      // Refetch to sync with other pages
      if (refetch) {
        await refetch();
      } else {
        setTasks((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!tasks || tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3 w-full">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          
        />
      ))}
    </div>
  );
}