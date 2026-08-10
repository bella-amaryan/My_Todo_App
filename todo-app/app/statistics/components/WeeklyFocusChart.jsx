"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

export default function WeeklyFocusChart({ data = [],bestFocusDay }) {
  const totalMinutes = data.reduce((sum, day) => sum + day.minutes, 0);

 

  const weeklyGoal = 420; // 60 min × 7 days

  return (
    <div className="border border-gray-800 rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-blue-500">
            Weekly Focus
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Track your focus minutes throughout the week
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-purple-500">
            {totalMinutes}m
          </p>

          <p className="text-xs text-[#FF7F50]">
            Total this week
          </p>
        </div>
      </div>

      {/* Best Day */}
      {bestFocusDay && (
        <div className="mb-5 rounded-xl bg-slate-800 p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-[#FF7F50]">
              🔥 Best Day
            </p>

            <p className="text-lg font-semibold text-purple-400">
              {bestFocusDay.day}
            </p>
          </div>
<div className="text-right">
            <p className="text-xl font-bold text-purple-400">
              {bestFocusDay.minutes} min
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="h-[280px] flex flex-col items-center justify-center text-center">

          <div className="text-5xl mb-4">
            🎯
          </div>

          <h3 className="text-lg font-semibold text-white">
            No Focus Sessions Yet
          </h3>

          <p className="text-gray-400 mt-2">
            Start your first focus session to see your weekly progress.
          </p>

        </div>
      ) : (
        <div className="h-[300px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={data}>

              <CartesianGrid
                stroke="#1f2937"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="day"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
                tickFormatter={(value) => `${value}m`}
              />

              <Tooltip
                formatter={(value) => [
                  `${value} min`,
                  "Focus Time",
                ]}
                contentStyle={{
                  background: "#0F172A",
                  borderRadius: "14px",
                  border: "1px solid #334155",
                  color: "slate-400",
                }}
              />

              {/* Goal Line */}
              <ReferenceLine
                y={60}
                stroke="#22C55E"
                strokeDasharray="5 5"
                label="Goal"
              />

              <Line
                type="natural"
                dataKey="minutes"
                stroke="#A855F7"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: "#A855F7",
                }}
                activeDot={{
                  r: 8,
                }}
                isAnimationActive
                animationDuration={1200}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>
      )}

      {/* Footer */}
      {data.length > 0 && (
        <div className="mt-5 flex justify-between text-sm text-blue-400 border-t border-slate-700 pt-4">

          <span>
            Weekly Goal
          </span>

          <span className="font-medium text-purple-400">
            {totalMinutes}/{weeklyGoal} min
          </span>

        </div>
      )}

    </div>
  );
}