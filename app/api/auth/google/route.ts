import { google } from "googleapis";
import { NextResponse } from "next/server";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

export async function GET(request) {
  const scopes = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
  ];

  // Assuming project details are passed as query parameters
  const { searchParams } = new URL(request.url);
  const projectDetails = {};
  for (const [key, value] of searchParams) {
    if (key !== 'state') { //avoid adding state to project details.
        projectDetails[key] = value;
    }
  }


  const state = JSON.stringify(projectDetails); //Serialize project details

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: state, // Pass project details in the state parameter
    prompt: "consent",
  });

  return NextResponse.json({ url });
}