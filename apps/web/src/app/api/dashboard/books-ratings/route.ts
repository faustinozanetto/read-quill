import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@modules/auth/lib/auth.lib';
import type { DashboardBooksRatingsGetResponse } from '@modules/api/types/dashboard-api.types';

// /api/dashboard/books-ratings GET : Gets all the books ratings
export async function GET(): Promise<NextResponse<DashboardBooksRatingsGetResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const books = await prisma.book.findMany({ where: { readerId: session.user.id }, select: { rating: true } });

    const booksRatings = books.reduce<Record<number, number>>((acc, curr) => {
      const rating = curr.rating ?? 0;

      if (!acc[rating]) acc[rating] = 1;
      else acc[rating] += 1;

      return acc;
    }, {});

    const mappedRatings = Object.entries(booksRatings).map((rating) => {
      return {
        rating: Number.parseInt(rating[0]),
        count: rating[1],
      };
    });

    return NextResponse.json({ booksRatings: mappedRatings });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
