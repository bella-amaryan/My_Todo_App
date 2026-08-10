import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb.js";
import Event from "../../models/Event.js";
import { getAuthenticatedUserId } from "../../lib/auth.js";


export async function GET() {
  try {
    await connectDB();
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized"
        },
        {
          status: 401
        }
      );
    }

   const events = await Event.find({
 userId:userId
}).sort({
 date:1
});

    return NextResponse.json(events, { status: 200 });

  } catch (error) {
    console.log("Get Events Error:", error);

    return NextResponse.json(
      {
        message: "Error fetching events",
      },
      {
        status: 500,
      }
    );
  }
}


export async function POST(req) {
  try {
    await connectDB();

   const userId  = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
 const body = await req.json();

    const { title, description, date } = body;


    // Required fields validation
    if (!title || !date) {
      return NextResponse.json(
        {
          message: "Title and date are required fields",
        },
        {
          status: 400,
        }
      );
    }


    // Date validation
    const eventDate = new Date(date);

    if (isNaN(eventDate.getTime())) {
      return NextResponse.json(
        {
          message: "Invalid date format",
        },
        {
          status: 400,
        }
      );
    }


    // Create event
    const event = await Event.create({
      title,
      description,
      date: eventDate,
      userId,
    });


    return NextResponse.json(event, {
      status: 201,
    });


  } catch (error) {
    console.log("POST Event Error:", error);

    return NextResponse.json(
      {
        message: "Failed to create event",
      },
      {
        status: 500,
      }
    );
  }
}