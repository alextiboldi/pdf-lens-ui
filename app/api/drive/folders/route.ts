
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token');

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    oauth2Client.setCredentials({
      access_token: accessToken.value
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parentId') || 'root';
    
    const query = parentId === 'root' 
      ? "mimeType='application/vnd.google-apps.folder' and 'root' in parents"
      : `mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents`;

    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name)',
      spaces: 'drive'
    });

    return NextResponse.json({ folders: response.data.files || [] });
  } catch (error) {
    console.error('Failed to fetch folders:', error);
    return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
  }
}
