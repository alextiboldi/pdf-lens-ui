import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies(); // Await the promise to get the actual cookies object
  const accessToken = cookieStore.get("access_token"); // No need for await here
  return NextResponse.json({
    authenticated: !!accessToken?.value,
  });
}
