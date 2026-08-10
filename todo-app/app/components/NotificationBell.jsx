"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Trash2,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
} from "lucide-react";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  function NotificationIcon(type) {
    switch (type) {
      case "TASK_DUE":
        return <Clock size={18} className="text-yellow-400" />;

      case "TASK_OVERDUE":
        return <AlertTriangle size={18} className="text-red-400" />;

      case "TASK_COMPLETED":
        return <CheckCircle size={18} className="text-green-400" />;

      case "WEEKLY_SUMMARY":
        return <BarChart3 size={18} className="text-blue-400" />;

      case "DAILY_REMINDER":
        return <Bell size={18} className="text-purple-400" />;

      default:
        return <Bell size={18} />;
    }
  }

  // Get notifications
  async function getNotifications() {
    try {
      const res = await fetch("/api/notifications");

      const data = await res.json();

      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Load notifications + refresh
  useEffect(() => {
    getNotifications();

    const interval = setInterval(() => {
      getNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function closeDropdown(e) {
      if (!e.target.closest(".notification-container")) {
        setOpen(false);
      }
    }

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  // Mark one as read
  async function markAsRead(id) {
    const notification = notifications.find((item) => item._id === id);
    if (notification?.isRead) return;

    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
      });

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((item) =>
            item._id === id
              ? {
                  ...item,
                  isRead: true,
                }
              : item,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Mark all as read
  async function markAllRead() {
    try {
      const res = await fetch("/api/notifications/read-all", {
        method: "PATCH",
      });

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((item) => ({
            ...item,

            isRead: true,
          })),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Delete notification
  async function deleteNotification(e, id) {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNotifications((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative notification-container">
      {/* Bell Button */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="
        relative
        h-11
        w-11
        rounded-full
        border
        border-slate-700
        flex
        text-purple-700
        items-center
        justify-center
        hover:bg-purple-500
        transition
      "
      >
        <Bell
          size={20}
          className={unreadCount > 0 ? "animate-pulse text-purple-600" : ""}
        />

        {unreadCount > 0 && (
          <span
            className="
            absolute
            top-0
            right-0
            bg-red-500
            text-white
            text-xs
            h-5
            w-5
            rounded-full
            flex
            items-center
            justify-center
          "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="
          absolute
          right-0
          mt-3
          w-80
          bg-slate-900
          border
          border-slate-700
          rounded-2xl
          shadow-xl
          p-4
          z-50
        "
        >
          {/* Header */}

          <div
            className="
            flex
            items-center
            justify-between
            mb-4
          "
          >
            <h3 className="font-semibold">Notifications</h3>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="
                text-xs
                text-purple-400
                hover:text-purple-300
              "
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}

          <div
            className="
            max-h-96
            overflow-y-auto
          "
          >
            {loading ? (
              <p className="text-sm text-slate-400">Loading...</p>
            ) : notifications.length === 0 ? (
              <div
                className="
                flex
                flex-col
                items-center
                py-8
                text-slate-400
              "
              >
                <Bell size={30} />

                <p className="mt-2 text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item._id}
                  onClick={() => markAsRead(item._id)}
                  className={`
                  border-b
                  border-slate-800
                  py-3
                  px-2
                  cursor-pointer
                  rounded-lg
                  transition
                   hover:bg-slate-800/50

                  ${!item.isRead ? "bg-purple-500/10" : ""}
                `}
                >
                  <div
                    className="
                    flex
                    justify-between
                    gap-3
                  "
                  >
                    {/* Left side */}

                    <div
                      className="
                      flex
                      gap-3
                      flex-1
                    "
                    >
                      {/* Icon */}

                      <div className="mt-1">{NotificationIcon(item.type)}</div>

                      {/* Content */}
<div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{item.title}</p>
                        {!item.isRead && (
                          <span
                            className="
               h-2
               w-2
               rounded-full
              bg-purple-500
               "
                          />
                        )}
                        </div>

                        <p
                          className="
                          text-sm
                          text-slate-400
                        "
                        >
                          {item.message}
                        </p>

                        {item.createdAt && (
                          <p
                            className="
                            text-xs
                            text-slate-500
                            mt-1
                          "
                          >
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Delete Button */}

                    <button
                      onClick={(e) => deleteNotification(e, item._id)}
                      className="
                      text-red-400
                      hover:text-red-300
                    "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
