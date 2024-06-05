import { BookReadRegistriesGetResponse } from '@modules/api/types/books-api.types';
import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// /api/book/read-registries GET : Gets the book read registries
export async function GET(request: NextRequest): Promise<NextResponse<BookReadRegistriesGetResponse>> {
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

    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Fetch read registries for the current page
    const readRegistries = await prisma.readRegistry.findMany({
      where: { bookId },
      include: { book: { select: { pageCount: true, image: true, name: true } } },
      skip: pageSize * pageIndex,
      take: pageSize,
      cacheStrategy: { swr: 60, ttl: 60 },
    });

    // Fetch the total count of read registries
    const totalCount = await prisma.readRegistry.count({
      where: { bookId },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);

    return NextResponse.json({ data: { readRegistries, pageCount } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
