import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getAuthenticatedUserId() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  console.log("token is " + token);

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return decoded.userId;

  } catch (error) {
    console.log("JWT Error:", error);
    return null;
  }
}