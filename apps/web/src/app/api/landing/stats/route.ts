import type { LandingStatsGetResponse } from '@modules/api/types/landing-api.types';
import { prisma } from '@read-quill/database';
import { NextResponse } from 'next/server';

// /api/landing/stats GET : Gets the stats for the landing page
export async function GET(): Promise<NextResponse<LandingStatsGetResponse>> {
  try {
    const activeUsers = await prisma.user.count();
    const booksRegistered = await prisma.book.count();
    const pagesRead = (await prisma.readRegistry.findMany()).reduce<number>((acc, curr) => acc + curr.pagesRead, 0);
    const annotationsCreated = await prisma.annotation.count();

    return NextResponse.json({ activeUsers, booksRegistered, pagesRead, annotationsCreated });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
