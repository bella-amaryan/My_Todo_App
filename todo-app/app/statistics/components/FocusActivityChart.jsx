"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function FocusActivityChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <div className="h-[280px] flex items-center justify-center text-blue-400">
        No focus activities yet.
      </div>
    );
  }

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            stroke="#374151"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="title"
            stroke="#9CA3AF"
          />

          <YAxis
            stroke="#9CA3AF"
            unit="m"
          />

          <Tooltip
            contentStyle={{
            
              border: "none",
              borderRadius: "12px",
              color: "white",
            }}
          />

          <Bar
            dataKey="minutes"
            radius={[8, 8, 0, 0]}
            fill="#8b5cf6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}