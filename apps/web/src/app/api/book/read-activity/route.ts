import { BookReadActivityGetResponse } from '@modules/api/types/books-api.types';
import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';

// /api/book/read-activity GET : Gets the book read activity
export async function GET(request: NextRequest): Promise<NextResponse<BookReadActivityGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);

    const bookId = searchParams.get('bookId');
    if (!bookId) {
      return NextResponse.json(
        {
          error: {
            message: 'Book ID is required!',
          },
        },
        { status: 400 }
      );
    }

    // Fetch read registries for the current page
    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { id: bookId } },
      orderBy: { createdAt: 'desc' },
    });

    const readActivity = readRegistries.reduce<Record<string, number>>((acc, cur) => {
      const { pagesRead, createdAt } = cur;
      const date = new Date(createdAt).toISOString().split('T')[0];

      if (!acc[date]) {
        acc[date] = pagesRead;
      } else {
        acc[date] += pagesRead;
      }

      return acc;
    }, {});

    return NextResponse.json({ data: { readActivity } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
