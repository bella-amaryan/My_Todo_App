import connectDB from "../../../lib/mongodb";
import Todo from "../../../models/Todo";
import NotificationService from "../../../lib/notificationService.js";
import { NextResponse } from "next/server";



export async function GET(){
    try{
        await connectDB();
        const today = new Date();

        //beginning of today
        const start = new Date(today);
        start.setHours(0,0,0,0);

        //end of today
        const end = new Date(today);
        end.setHours(23,59,59,95);

        //tasks due today
        const dueToday = await Todo.find(
            {completed:false,
                dueDate:{
                    $gte:start,
                    $lte:end,
                },
            }
        )

        for(const todo of dueToday){
            await NotificationService.due(todo.userId)
        }

        // Overdue tasks
    const overdue = await Todo.find({
      completed: false,
      dueDate: {
        $lt: start,
      },
    });

    for (const todo of overdue) {
      await NotificationService.overdue(todo.userId, todo);
    }

        return NextResponse.json({
            success:true,
            dueToday:dueToday.length,
            overdue:overdue.length,
        })

    }catch(error){
        console.log(error);
        return NextResponse.json(
            {message:"Server error"},
            {statu:500}
        )
    }
}