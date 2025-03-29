
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = await cookieStore.get('access_token');
  
  return NextResponse.json({ 
    authenticated: !!accessToken?.value 
  });
}
