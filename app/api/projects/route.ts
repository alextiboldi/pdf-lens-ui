
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token');
    const refreshToken = cookieStore.get('refresh_token');
    
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        datasource: body.datasource,
        folderId: body.folderId,
        accessToken: accessToken?.value,
        refreshToken: refreshToken?.value,
        // Set expiry to 1 hour from now as per Google's default
        tokenExpiry: new Date(Date.now() + 3600000)
      }
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
