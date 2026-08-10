import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Notification from "../../../models/Notification.js";
import { getAuthenticatedUserId } from "../../../lib/auth.js";


export async function PATCH(req,{params}){
    try{
        await connectDB();

    const userId = await getAuthenticatedUserId();
    const {id} = await params;
    if(!userId){
        return NextResponse.json(
            {message:"Unauthorized"},
            {status:401}
        )

    }

    const notification = await Notification.findOneAndUpdate(
        {_id:id,
            userId
        },
         {
        isRead:true
      },
      {
        new:true
      }
    )

    return NextResponse.json(notification);
    
}catch(error){
        return NextResponse.json(
            {message:"Server error",error},
            {status:500}
        )
    }
}

export async function DELETE(req,{params}){

  try{

    await connectDB();

    const userId = await getAuthenticatedUserId();

    if(!userId){
      return NextResponse.json(
        {message:"Unauthorized"},
        {status:401}
      );
    }


    const {id} = await params;


    const notification = await Notification.findOneAndDelete({
      _id:id,
      userId
    });


    if(!notification){

      return NextResponse.json(
        {message:"Notification not found"},
        {status:404}
      );

    }


    return NextResponse.json({
      message:"Notification deleted"
    });


  }catch(error){

    console.log(error);

    return NextResponse.json(
      {message:"Server error"},
      {status:500}
    );

  }

}