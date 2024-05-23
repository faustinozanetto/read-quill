import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { supabase } from '@modules/supabase/lib/supabase.lib';
import { auth } from 'auth';
import { BookDeleteResponse, BookPatchResponse } from '@modules/api/types/books-api.types';
import { BOOK_ACTIONS_VALIDATIONS_API } from '@modules/books/validations/books.validations';

// /api/books GET : Gets a book by a given bookId
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return new NextResponse('Book ID is missing', { status: 400 });
    }

    const book = await prisma.book.findUnique({ where: { id: bookId }, include: { reader: true } });
    return NextResponse.json({ book });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/books POST : creates a book
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const email = session.user.email;

    const json = await request.json();
    const { name, author, coverImage, language, pageCount, startedAt, finishedAt } =
      BOOK_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const book = await prisma.book.create({
      data: {
        name,
        author,
        language,
        pageCount,
        coverImage,
        startedAt,
        finishedAt,
        reader: {
          connect: {
            email,
          },
        },
      },
      include: {
        reader: true,
      },
    });

    return NextResponse.json({ book });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/books PATCH : updates a book
export async function PATCH(request: NextRequest): Promise<NextResponse<BookPatchResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId, ...updateData } = BOOK_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

    const book = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        ...updateData,
      },
      include: {
        reader: true,
      },
    });

    return NextResponse.json({ book });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/books DELETE : deletes a book
export async function DELETE(request: NextRequest): Promise<NextResponse<BookDeleteResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId } = BOOK_ACTIONS_VALIDATIONS_API.DELETE.parse(json);

    const book = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    // Extract supabase image name from the complete url.
    const supabaseCoverPath = book.coverImage.split('/').slice(-1).toString();
    await supabase.storage.from('BookCovers').remove([supabaseCoverPath]);

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
