import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authOptions } from '@modules/auth/lib/auth.lib';
import type { UserBooksGetResponse } from '@modules/api/types/books-api.types';

// /api/books/user GET : Gets the books of the user
export async function GET(request: NextRequest): Promise<NextResponse<UserBooksGetResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const { searchParams } = new URL(request.url);

    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Paginate the books
    const books = await prisma.book.findMany({
      where: { readerId: session.user.id },
      skip: pageSize * pageIndex,
      take: pageSize,
    });

    // Fetch the total count of books
    const totalCount = await prisma.book.count({
      where: { readerId: session.user.id },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    return NextResponse.json({ books, pageCount, hasMore });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
