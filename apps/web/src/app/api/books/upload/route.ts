import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  const file = request.body || '';

  const contentType = request.headers.get('content-type') || 'text/plain';
  const blob = await put(filename!, file, {
    access: 'public',
    contentType,
  });

  return NextResponse.json(blob);
}
