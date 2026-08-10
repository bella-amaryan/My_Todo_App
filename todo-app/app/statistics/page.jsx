"use client";

import {
  CheckCircle,
  Flame,
  Target,
  ArrowLeft,
  
} from "lucide-react";

import StatCard from "./components/StatCard";
import CategoryChart from "./components/CategoryChart.jsx";
import CompletionChart from "./components/CompletionChart";
import Insights from "./components/Insights";
import Achievements from "./components/Achievements";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FocusTimer from "./components/FocusTimer";
import WeeklyFocusChart from "./components/WeeklyFocusChart";
import FocusActivityChart from "./components/FocusActivityChart";


export default function StatisticsPage(){
  const now = new Date();

const month = now.toLocaleString("en-US", {
  month: "long",
});

const year = now.getFullYear();

    const router = useRouter();
    const[stats, setStats] = useState(null);
    
        const loadStats = async()=>{
          const res = await fetch("/api/statistics")
        const data = await res.json();
            setStats(data);
        };

       useEffect(()=>{
    loadStats();
},[]);
        
  


    if(!stats){
        return (
<div className="p-10 text-slate-500">
Loading statistics...
</div>
)

}

console.log(stats)
    

return (

<div className="min-h-screen  text-blue-300 p-6">
    <div className="mb-8 flex items-center justify-between">
      <button
        onClick={() => router.push("/dashboard")}
        className="
    group
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    border
    border-slate-700
    text-slate-400
    transition-all
    hover:-translate-x-1
    hover:bg-purple-500/20
    hover:text-purple-400
  "
        
      >
        <ArrowLeft
        size={20}/>

      </button>

      
    </div>


{/* Header */}

<div className="flex justify-between items-center mb-8">

<div>

<h1 className="text-3xl font-bold text-cyan-600">
Your Productivity Statistics
</h1>

<p className="text-slate-500 ms-10   mt-2">
 This Month • {month} {year}
</p>

</div>



</div>

{/* Overview Cards */}

<div className="  grid md:grid-cols-4  gap-5 mb-6">


<StatCard
icon={<Target/>}
title="Total Tasks"
value={stats.total}
/>


<StatCard
icon={<CheckCircle/>}
title="Completed"
value={stats.completed}
/>


<StatCard
icon={<Flame/>}
title="Current Streak"
value={`${stats.streak} Days`}
/>


<StatCard
  icon={<Target/>}
  title="Productivity Score"
  value={`${stats.completionRate}/100`}
/>


</div>

<div className="grid lg:grid-cols-3 gap-5">


{/* left */}

<div className="lg:col-span-2 space-y-5">


<div className="

rounded-2xl
p-5
border border-gray-800
">

<h2 className="font-semibold  text-blue-500 mb-5">
Completion History
</h2>

<CompletionChart
data={stats.completionData}/>


</div>


<FocusTimer refreshStats={loadStats} />

<WeeklyFocusChart
  data={stats.focusWeeklyData || []}
  bestFocusDay={stats.bestFocusDay}
/>
<FocusActivityChart
  data={stats.focusActivityData || []}
/>


</div>

{/* right */}
<div className="space-y-5">


<CategoryChart

data={
Object.entries(stats.categories)
.map(([name,value])=>({

name,
value,
fill:
name === "Work" ? "#3b82f6" :
name === "Personal" ? "#22c55e" :
name === "Study" ? "#f59e0b" :
name === "Fitness" ? "#ef4444" :
"#8b5cf6"

}))
}

/>

<Insights stats={stats?.insights || []} />

<Achievements stats={stats}/>


</div>



</div>


</div>

)

}