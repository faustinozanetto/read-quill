import { authOptions } from '@modules/auth/lib/auth.lib';
import { bookFavouriteValidationSchemaForm } from '@modules/books/validations/books.validations';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// /api/books/favourite POST : sets book as favourite or not
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const email = session.user?.email;
    if (!email) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();

    const { bookId, isFavourite } = bookFavouriteValidationSchemaForm.parse(json);

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        isFavourite,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
