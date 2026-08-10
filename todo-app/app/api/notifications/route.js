import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb.js";
import Notification from "../../models/Notification.js";
import { getAuthenticatedUserId } from "../../lib/auth.js";


// GET USER NOTIFICATIONS
export async function GET(){

  try{

    await connectDB();


    const userId = await getAuthenticatedUserId();


    if(!userId){

      return NextResponse.json(
        {
          message:"Unauthorized"
        },
        {
          status:401
        }
      );

    }


    const notifications = await Notification
      .find({ userId })
      .sort({ createdAt:-1 });


    return NextResponse.json(notifications);

   }catch(error){

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





// CREATE NOTIFICATION
export async function POST(req){

  try{

    await connectDB();


    const userId = await getAuthenticatedUserId();


    if(!userId){

      return NextResponse.json(
        {
          message:"Unauthorized"
        },
        {
          status:401
        }
      );

    }



    const body = await req.json();



    const notification = await Notification.create({

      userId,

      title: body.title,

      message: body.message,

      type: body.type || "SYSTEM",

    });

   





    return NextResponse.json(
      notification,
      {
        status:201
      }
    );



  }catch(error){

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

