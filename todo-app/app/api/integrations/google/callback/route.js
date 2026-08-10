import { google } from "googleapis";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "../../../../lib/mongodb";
import Integration from "../../../../models/Integration";

export async function GET(request) {
  try {
    const cookieStore = await cookies();

    const stateCookie = cookieStore.get("google_oauth_state")?.value;
    const userId = cookieStore.get("google_oauth_user")?.value;

    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");
    const state = searchParams.get("state");


    // Check Google response
    if (!code || !state) {
      return NextResponse.json(
        {
          message: "Missing authorization code or state",
        },
        { status: 400 }
      );
    }


    // Security check
    if (state !== stateCookie) {
      return NextResponse.json(
        {
          message: "Invalid OAuth state",
        },
        { status: 400 }
      );
    }


    // Check user
    if (!userId) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 401 }
      );
    }


    // Google OAuth client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:3000/api/integrations/google/callback"
    );


    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);


    oauth2Client.setCredentials(tokens);


    // Get Google user information
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });


    const { data } = await oauth2.userinfo.get();


    // Connect database
    await connectDB();


    // Save integration
    await Integration.findOneAndUpdate(
      {
        userId,
        provider: "google",
      },
      {
        providerId: data.id,
        email: data.email,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        connected: true,
      },
      {
        upsert: true,
        new: true,
      }
    );


    // Remove temporary cookies
    cookieStore.delete("google_oauth_state");
    cookieStore.delete("google_oauth_user");


    // Redirect back to integrations page
    return NextResponse.redirect(
      new URL("/settings/integrations", request.url)
    );


  } catch (error) {

    console.error(
      "Google OAuth callback error:",
      error
    );


    return NextResponse.json(
      {
        message: "Google connection failed",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}