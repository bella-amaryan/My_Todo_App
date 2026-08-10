import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb.js";
import Goal from "../../models/Goal.js";
import { getAuthenticatedUserId } from "../../lib/auth.js";

export  async function GET(){
try{
    await connectDB();
    const userId = await getAuthenticatedUserId();

    if(!userId){
        return NextResponse.json(
            {message:"Unauthorized"},
            {status:401}
        );
    }
     const data = await Goal.findOne({userId})
     return NextResponse.json(data || {
        goals:"",
        notes:""
     })

}catch(error){
    return NextResponse.json(
        {message:"Error fetching goals"},
        {status:500}
    );
    
}

}

export async function POST(req){
    try{
        await connectDB()
        const userId = await getAuthenticatedUserId();

        if(!userId){
            return NextResponse.json(
                {message:"Unauthorized"},
                {status:401}
            );
        }

        const body=await req.json()
        const {goals,notes} = body
    const data = await Goal.findOneAndUpdate(
        {userId},
        {goals:goals || "",
            notes: notes || ""},

             {
        new: true,
        upsert: true,
      }
    )

    return NextResponse.json(data, {status:200})



    }catch(error){
        return NextResponse.json(
            {message:"Failed to post goals"},
            {status:500}
        )
}
}
