import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import FocusSession from "../../models/FocusSession";
import { getAuthenticatedUserId } from "../../lib/auth";


export async function POST(req) {
  try {
    await connectDB();

    const userId = await getAuthenticatedUserId();

    const { title,minutes } = await req.json();

    const session = await FocusSession.create({
      userId,
      title,
      minutes,
    });

    return NextResponse.json(session);

  } catch(error) {

    return NextResponse.json(
      {message:error.message},
      {status:500}
    );

  }
}