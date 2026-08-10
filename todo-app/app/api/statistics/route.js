import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb.js";
import Todo from "../../models/Todo.js";
import { getAuthenticatedUserId } from "../../lib/auth.js";
import FocusSession from "../../models/FocusSession.js";

export async function GET() {
    try {
        await connectDB();
        const userId = await getAuthenticatedUserId();

        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const todos = await Todo.find({ userId });
        const total = todos.length;

        const completedTodos = todos.filter((todo) => todo.completed);
        const completed = completedTodos.length;
        const pending = total - completed;
        const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

        const priority = {
            high: 0,
            medium: 0,
            low: 0,
        };

        const categories = {};

        todos.forEach((todo) => {
            if (todo.priority) {
                const level = todo.priority.toLowerCase();
                if (priority[level] !== undefined) {
                    priority[level]++;
                }
            }

            if (todo.category) {
                categories[todo.category] = (categories[todo.category] || 0) + 1;
            }
        });

        // Calculate streak based on unique completed days only
        const completedDates = completedTodos
            .filter((todo) => todo.completedAt)
            .map((todo) => {
                const date = new Date(todo.completedAt);
                date.setHours(0, 0, 0, 0);
                return date;
            })
            .sort((a, b) => b - a);

        const uniqueDates = [...new Set(completedDates.map((date) => date.toISOString()))]
            .map((isoDate) => new Date(isoDate));

        let streak = 0;
        if (uniqueDates.length) {
            let currentDay = new Date();
            currentDay.setHours(0, 0, 0, 0);

            for (const date of uniqueDates) {
                const diff = Math.floor((currentDay - date) / (1000 * 60 * 60 * 24));

                if (diff <= 1) {
                    streak++;
                    currentDay = date;
                } else {
                    break;
                }
            }
        }

        const completionHistory = {};

        completedTodos.forEach((todo) => {
            if (todo.completedAt) {
                const date = new Date(todo.completedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                });

                completionHistory[date] = (completionHistory[date] || 0) + 1;
            }
        });

        const completionData = Object.entries(completionHistory)
            .map(([name, value]) => ({
                name,
                tasks: value,
            }))
            .sort((a, b) => new Date(a.name) - new Date(b.name));

       // ================================
// FOCUS ANALYTICS
// ================================

const sessions = await FocusSession.find({
    userId
});


// 1. Weekly Focus (Sun-Sat)

const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];


const weeklyMap = {};

weekDays.forEach(day=>{
    weeklyMap[day] = 0;
});


sessions.forEach(session=>{

    const day = new Date(session.date)
    .toLocaleDateString("en-US",{
        weekday:"short"
    });


    weeklyMap[day] += session.minutes;

});


const focusWeeklyData = weekDays.map(day=>({

    day,
    minutes: weeklyMap[day]

}));

const bestFocusDay = focusWeeklyData.some(
    day => day.minutes > 0
)
? [...focusWeeklyData].sort(
    (a,b)=>b.minutes-a.minutes
)[0]
: null;



// 2. Focus Activities

const activityMap = {};


sessions.forEach(session=>{
const title = session.title || "Untitled";

  activityMap[title] =
    (activityMap[title] || 0)
    +
    session.minutes;


});


const focusActivityData = Object.entries(activityMap)
.map(([title,minutes])=>({

    title,
    minutes

}))
.sort((a,b)=>b.minutes-a.minutes);

const totalFocusMinutes = sessions.reduce(
    (sum,session)=>sum + session.minutes,0);
    const topFocusActivity=[...focusActivityData]
    .sort((a,b)=>b.minutes-a.minutes)[0];
    

    const averageFocusMinutes = sessions.length
    ? Math.round(totalFocusMinutes / sessions.length)
    : 0;


       
        const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];

       const insights = [];


if (completionRate >= 80) {

    insights.push({
        icon:"🔥",
        type:"success",
        text:`Excellent productivity! You completed ${completionRate}% of your tasks.`
    });

} 
else if (pending > 0) {

    insights.push({
        icon:"🎯",
        type:"warning",
        text:`You still have ${pending} tasks waiting. Focus on your priorities.`
    });

}



if (streak >= 3) {

    insights.push({
        icon:"⚡",
        type:"success",
        text:`You are on a ${streak}-day productivity streak.`
    });

}



if (topCategory) {

    insights.push({
        icon:"📚",
        type:"info",
        text:`Your strongest category is ${topCategory[0]} with ${topCategory[1]} tasks.`
    });

}



if (totalFocusMinutes > 0) {

    insights.push({
        icon:"⏱",
        type:"info",
        text:`You spent ${totalFocusMinutes} minutes in focus sessions.`
    });

}



if(topFocusActivity){

    insights.push({
        icon:"💻",
        type:"info",
        text:`Your main focus activity is ${topFocusActivity.title}.`
    });

}


if(bestFocusDay?.minutes > 0){

    insights.push({
        icon:"🚀",
        type:"info",
        text:`Your best focus day was ${bestFocusDay.day} with ${bestFocusDay.minutes} minutes.`
    });

}



if(insights.length === 0){

    insights.push({
        icon:"🌱",
        type:"info",
        text:"Start completing tasks and focus sessions to generate insights."
    });

}

        return NextResponse.json({
            total,
            completed,
            pending,
            completionRate,
            priority,
            categories,
            streak,
            completionData,
            focusWeeklyData,
            focusActivityData,
            totalFocusMinutes,
             averageFocusMinutes,
            topFocusActivity,
             bestFocusDay,
            insights,
        });
    } catch (error) {
        console.log("Statistic error:", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}