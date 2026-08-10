
import connectDB from "../../../lib/mongodb";
import {NextResponse} from "next/server";
import {getAuthenticatedUserId} from "../../../lib/auth";
import User from "../../../models/User";
import Todo from "../../../models/Todo";
import Event from "../../../models/Event";
import Notification from "../../../models/Notification";
import FocusSession from "../../../models/FocusSession";
import Goal from "../../../models/Goal";

export async function DELETE(){
    try{
        await connectDB();
        const userId = await getAuthenticatedUserId();
        if(!userId){
            return NextResponse.json(
                {message:"Unauthorized"},
                {status:401}
            )
        }

        //Delete user data
        
const model = [
    Todo,
    Event,
    Notification,
    FocusSession,
    Goal
];

await Promise.all(
    model.map((model)=>
        model.deleteMany({userId})
)
)
        

     // Delete account

    await User.findByIdAndDelete(userId);


    return NextResponse.json({
      message:"Account deleted successfully"
    });


    }catch(error){

    }
}