"use client";

export default function TaskTabs({ status, setStatus }) {
  const tabs = [
    { key: "all", label: "All" },
    { key: "today", label: "Today" },
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
    { key: "overdue", label: "Overdue" },
  ];

  return (
    <div className="flex flex-wrap gap-9">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setStatus(tab.key)}
          className={`
            rounded-2xl px-4 py-2  text-5sm text-green-700
            ${
              status === tab.key
                ? "bg-green-500 text-white shadow"
                : " hover:bg-green-200"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}