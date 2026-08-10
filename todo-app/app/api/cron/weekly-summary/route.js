import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import Todo from "../../../models/Todo";
import NotificationService from "../../../lib/notificationService";


export async function GET() {

  try {

    await connectDB();


    const users = await User.find({});


    const startOfWeek = new Date();

    startOfWeek.setDate(
      startOfWeek.getDate() - 7
    );



    for (const user of users) {


      const todos = await Todo.find({

        userId: user._id,

        createdAt:{
          $gte:startOfWeek
        }

      });



      const total = todos.length;


      const completed = todos.filter(
        todo => todo.completed
      ).length;



      const pending = total - completed;



      const completionRate =
        total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
          );



      const message = 
`You completed ${completed} tasks this week.
Pending tasks: ${pending}.
Completion rate: ${completionRate}%.`;



      await NotificationService.weekly(
        user._id,
        message
      );


    }



    return NextResponse.json({

      success:true,

      message:"Weekly summaries created"

    });



  } catch(error){

    console.log(error);


    return NextResponse.json(
      {
        message:"Server error"
      },
      {
        status:500
      }
    );

  }

}