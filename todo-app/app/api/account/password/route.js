import bcrypt from "bcrypt";
import connectDB from "../../../lib/mongodb";
import {NextResponse} from "next/server";
import {getAuthenticatedUserId} from "../../../lib/auth";
import User from "../../../models/User";

export async function PUT(req){
    try{
        await connectDB()
        const userId= await getAuthenticatedUserId();
        if(!userId){
            return NextResponse.json(
                {message:"Unauthorized"},
                {status:401}
            )
        }

        const{
            currentPassword,
            newPassword,
            confirmPassword,
        } =await req.json();

        if(!currentPassword || !newPassword || !confirmPassword){
            return NextResponse.json(
                {message:"All fields are required"},
                {status:400}
            )
        }

        if(newPassword !== confirmPassword){
            return NextResponse.json(
                {message:"New password and confirm password do not match"},
                {status:400}
            )
        }

        const user = await User.findById(userId)

        if(!user){
            return NextResponse.json(
                {message:"User not found"},
                {status:404}
            )
        }

        const isCorrectPassword = await bcrypt.compare(
            currentPassword,
            user.password
        )

        if(!isCorrectPassword){
            return NextResponse.json(
                {message:"Current password is incorrect"},
                {status:400}
            )
        }
            
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        )
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            {message:"Password updated successfully"},
            {status:200}
        )

    }catch(error){
        console.log(error)
    return NextResponse.json(
        {message:"Server error"},
        {status:500}
    )
}
}