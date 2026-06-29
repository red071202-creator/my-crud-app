import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() { //  Grabs the environment variables
  const clientId = process.env.GOOGLE_CLIENT_ID; // identifies your app to Google.
  const redirectUri = process.env.GOOGLE_REDIRECT_URI; // ells Google where to send the user back after login.

  if (!clientId || !redirectUri) { // Error kapag mali ang environment variables.
    throw new Error("Google OAuth environment variables are missing.");
  }

  const state = randomUUID();
  const cookieStore = await cookies();

  cookieStore.set("google_oauth_state", state, { // google_oauth_state is variable name (like jar label) state = the value stored inside the jar
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });

  redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}

/*
  So this file's whole job was just:

  1. Grab credentials from .env
  2. Generate a security state and save it in a cookie
  3. Build the Google login URL
  4. Redirect the user there

*/