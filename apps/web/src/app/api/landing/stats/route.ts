import { prisma } from '@read-quill/database';
import { NextResponse } from 'next/server';
import type { LandingStatsGetResponse } from '@modules/api/types/landing-api.types';

// /api/landing/stats GET : Gets the stats for the landing page
export async function GET(): Promise<NextResponse<LandingStatsGetResponse>> {
  try {
    const activeUsers = await prisma.user.count();
    const booksRegistered = await prisma.book.count();
    const pagesRead = await prisma.readRegistry.aggregate({
      _sum: { pagesRead: true },
    });
    const annotationsCreated = await prisma.annotation.count();

    return NextResponse.json({
      data: { stats: { activeUsers, booksRegistered, pagesRead: pagesRead._sum.pagesRead ?? 0, annotationsCreated } },
    });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
