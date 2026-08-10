import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb.js";
import Notification from "../../../models/Notification.js";
import { getAuthenticatedUserId } from "../../../lib/auth.js";


export async function PATCH(){
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

        await Notification.updateMany(
            {userId,
                isRead:false
            },
            {
                isRead:true
            }
        )
        return NextResponse.json(
            {message:"All notification marked as read"}
        )

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
