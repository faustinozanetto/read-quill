import type { DashboardBooksRatingsGetResponse } from '@modules/api/types/dashboard-api.types';
import { authOptions } from '@modules/auth/lib/auth.lib';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// /api/dashboard/books-ratings GET : Gets all the books ratings
export async function GET(): Promise<NextResponse<DashboardBooksRatingsGetResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const books = await prisma.book.findMany({ where: { readerId: session.user.id }, select: { rating: true } });

    const booksRatings = books.reduce<DashboardBooksRatingsGetResponse['booksRatings']>((acc, curr) => {
      const rating = curr.rating ?? 0;

      if (!acc[rating]) acc[rating] = 1;
      else acc[rating] += 1;

      return acc;
    }, {});

    return NextResponse.json({ booksRatings });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
