import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "../../lib/auth.js";
import connectDB from "../../lib/mongodb.js";
import User from "../../models/User.js";


export async function GET(){
    try{

        await connectDB();
        const userId = await getAuthenticatedUserId();
        if(!userId){
            return NextResponse.json(
                {message:"Unauthorized"},
                {status:401}
            );
        }

        const user = await User
        .findById(userId)
        .select("-password");

        if(!user){
            return NextResponse.json(
                {message:"User not found"},
                {status:404}
            );
        }
        return NextResponse.json(user); 


    }catch(error){
        return NextResponse.json(
            {message:"Server error"},
            {status:500}
        )
    }
}

export async function PUT(req){
    try{
        await connectDB();
        const userId = await getAuthenticatedUserId();
        if(!userId){
            return NextResponse.json(
                {message:"Unauthorized"},
                {status:401}
            )
        }
        const body = await req.json()

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set:body,
                updatedAt:Date.now(),
            },
            {
                new:true,
            }
        ).select("-password");

        return NextResponse.json(updatedUser)
    }catch(error){
        console.log(error);
        return NextResponse.json(
            {message:"Server error"},
            {status:500}
        )
    }
}