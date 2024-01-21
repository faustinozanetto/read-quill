import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import type { DashboardBooksProgress } from '@modules/dashboard/types/dashboard.types';
import { authOptions } from '@modules/auth/lib/auth.lib';

// /api/dashboard/books-progress GET : Gets the reading progress of the user books
export async function GET(): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { readerId: session.user.id } },
      include: { book: { select: { name: true, pageCount: true, coverImage: true } } },
    });

    const booksProgress = readRegistries.reduce<DashboardBooksProgress>((acc, curr) => {
      const { bookId, pagesRead, book } = curr;
      const pageCount = book.pageCount || 1; // Prevent division by zero

      if (!acc[bookId]) {
        acc[bookId] = {
          progress: (pagesRead / pageCount) * 100,
          cover: book.coverImage,
          name: book.name,
        };
      } else {
        acc[bookId].progress += (pagesRead / pageCount) * 100;
      }

      acc[bookId].progress = Math.round(acc[bookId].progress);

      return acc;
    }, {});

    return NextResponse.json({ booksProgress });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
