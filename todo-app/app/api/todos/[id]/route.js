import { NextResponse } from "next/server";
import Todo from "../../../models/Todo";
import connectDB from "../../../lib/mongodb";
import Notification from "../../../models/Notification";
import { getAuthenticatedUserId } from "../../../lib/auth.js";



export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const userId = await getAuthenticatedUserId();
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todo = await Todo.findOneAndDelete({
      _id: id,
      userId,
    });

 if (!todo) {
      return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
        message:"Deleted",
        id,
    })
}catch(err){
return NextResponse.json(
  {message:err.message},
  {status:500}
)

}
}

//complete
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const userId = await getAuthenticatedUserId();
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todo = await Todo.findOne({
      _id: id,
      userId,
    });
    

    if (!todo) {
      return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }

     const wasCompleted = todo.completed;

    todo.completed = !todo.completed;
    if (todo.completed) {
  todo.completedAt = new Date();
} else {
  todo.completedAt = null;
}
    await todo.save();

    // CREATE NOTIFICATION ONLY WHEN COMPLETED
    if(
      todo.completed &&
      !wasCompleted
    ){


      await Notification.create({

        userId:userId,

        title:"Task completed 🎉",

        message:
        `You completed "${todo.title}"`,

        type:"TASK_COMPLETED",

      });


    }

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}