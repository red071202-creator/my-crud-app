import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

type GoogleTokenResponse = {
  access_token: string;
};

type GoogleUserResponse = {
  sub: string;
  email: string;
  name?: string;
};

export async function GET(request: Request) {
  // Step 1: Grab code and state from the URL that Google sent back
  const requestUrl = new URL(request.url); // From google, just takes that raw URL string and turns it into an object so you can easily grab specific parts from it.                                         
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state"); 

  // The searchParams is everything after ?: http://localhost:3000/api/auth/google/callback?code=abc123&state=a1b2c3d4

  // Step 2: Compare state from Google vs state saved in cookie (security check)
  const cookieStore = await cookies(); // Opens the cookie jar.
  const storedState = cookieStore.get("google_oauth_state")?.value; // grab the state value from the google URL that I generate earlier using randomUUID() from the first route.ts

  if (!code || !state || !storedState || state !== storedState) { // If nag true kahit isa diyan mag rurun yung if statement
    redirect("/login");
  }

  // Step 3: Grab Google credentials from .env

  const clientId = process.env.GOOGLE_CLIENT_ID; // Simple analogy = app's username
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET; // your app's password
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Google OAuth environment variables are missing.");
  }

  // Step 4: Sending data to google and Exchanging the code for an access token

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    redirect("/login");
  }

  // converts the raw JSON string from Google into a JavaScript object you can actually use in your code.
  const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;

  // Send a request to Google to get the user's info (email, name)
  // using the access token as proof that we're allowed to access it
  const userResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo", // Google's URL that returns user info
    {
      headers: {
        // Attach the access token to the request like showing a ticket
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    },
  );

  if (!userResponse.ok) {
    redirect("/login");
  }

  // Convert Google's response into a JavaScript object
  const googleUser = (await userResponse.json()) as GoogleUserResponse;
  const email = googleUser.email.toLowerCase();

  const user = await prisma.user.upsert({ // upsert is update and insert at the same time, so cool <3
    where: { email }, // find the user by email

    // if user already exists → just update their Google info
    update: {
      googleId: googleUser.sub, // "sub" is Google's unique ID for this user
      name: googleUser.name ?? email,
    },

    // if user doesn't exist → create a new user
    create: {
      email,
      name: googleUser.name ?? email,
      googleId: googleUser.sub,
    },
  });

  const token = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.session.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  cookieStore.delete("google_oauth_state");
  
  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  redirect("/dashboard");
}
