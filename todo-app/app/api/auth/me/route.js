import connectDB from "../../../lib/mongodb.js";
import User from "../../../models/User.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDB();

    const cookiesStore = await cookies()

    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return Response.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return Response.json({ user: null }, { status: 404 });
    }

    return Response.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
    bio: user.bio,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return Response.json(
      { user: null, error: error.message },
      { status: 500 }
    );
  }
}