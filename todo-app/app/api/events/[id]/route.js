import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb.js";
import Event from "../../../models/Event.js";
import { getAuthenticatedUserId } from "../../../lib/auth.js";



// UPDATE EVENT
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const userId = await getAuthenticatedUserId(req);
    const { id } = await params;


    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }


    const event = await Event.findOne({
      _id: id,
      userId,
    });


    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }


    const body = await req.json();

    const { title, description, date } = body;


    if (title) event.title = title;
    if (description) event.description = description;

    if (date) {
      const eventDate = new Date(date);

      if (isNaN(eventDate.getTime())) {
        return NextResponse.json(
          { message: "Invalid date" },
          { status: 400 }
        );
      }

      event.date = eventDate;
    }


    await event.save();


    return NextResponse.json(event);


  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}



// DELETE EVENT
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const userId = await getAuthenticatedUserId();
    const { id } = await params;


    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }


    const event = await Event.findOneAndDelete({
      _id: id,
      userId,
    });


    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }


    return NextResponse.json({
      message: "Event deleted successfully",
      id,
    });


  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}