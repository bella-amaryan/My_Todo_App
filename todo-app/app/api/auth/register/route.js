import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb.js"
import User from "../../../models/User.js"
import bcrypt from "bcrypt"


export async function POST(req){
    try{
        await connectDB()

        const body = await req.json();
        const {name,email, password}=body;

        //validation
        if(!name ||!email ||!password){

            return NextResponse.json(
                {message:"All fields are required"},
                {status:400}
            )
        }

        //Check if user exists
        const existingUser = await User.findOne({email})
        if(existingUser){
        return NextResponse.json(
            {message:"An account with this email already exists"},
            {status:409}
        
        )
    }
 //valide email
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return NextResponse.json(
            {message:"Please enter a valid email address with "},
            {status:400}
        )
    }

    if(password.length < 6){
        return NextResponse.json(
            {message:"Password must be at least 6 characters"},
            {status:400}
        )
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    return NextResponse.json(
        {message:"User registered successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },
    },
    {status:201}
    );
    }catch(error){
        return NextResponse.json(
            {message:"Server error", error:error.message},
            {status:500}
        )
    }

    }



