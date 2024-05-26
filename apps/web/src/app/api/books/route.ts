import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from 'auth';
import {
  BookDeleteResponse,
  BookGetResponse,
  BookPatchResponse,
  BookPostResponse,
} from '@modules/api/types/books-api.types';
import { BOOK_ACTIONS_VALIDATIONS_API } from '@modules/books/validations/books.validations';
import { deleteImageFromSupabase } from '@modules/uploads/lib/uploads.lib';

// /api/books GET : Gets a book by a given bookId
export async function GET(request: NextRequest): Promise<NextResponse<BookGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return new NextResponse('Book ID is missing', { status: 400 });
    }

    const book = await prisma.book.findUnique({ where: { id: bookId }, include: { reader: true, image: true } });
    if (!book) {
      return new NextResponse('Could not find book!', { status: 404 });
    }

    return NextResponse.json({ book });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/books POST : Creates a book
export async function POST(request: NextRequest): Promise<NextResponse<BookPostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const email = session.user.email;

    const json = await request.json();
    const { name, author, imageId, language, pageCount, startedAt, finishedAt } =
      BOOK_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const book = await prisma.book.create({
      data: {
        name,
        author,
        language,
        pageCount,
        startedAt,
        finishedAt,
        reader: {
          connect: {
            email,
          },
        },
        image: {
          connect: {
            id: imageId,
          },
        },
      },
      include: {
        reader: true,
        image: true,
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
    const { bookId, imageId: newImageId, ...updateData } = BOOK_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
      include: {
        image: true,
      },
    });

    if (!book) {
      return new NextResponse('Could not find boko!', { status: 404 });
    }

    // If imageId is not undefined, we are updating book cover.
    if (newImageId !== undefined) {
      await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          imageId: newImageId,
        },
      });

      // Delete old image and remove it from supabase.
      const image = await prisma.image.delete({
        where: {
          id: book.image.id,
        },
      });

      const { error } = await deleteImageFromSupabase('BookCovers', image.path);
      if (error) {
        throw new NextResponse('Could not delete book!', { status: 500 });
      }
    }

    const updatedBook = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        ...updateData,
      },
      include: {
        reader: true,
        image: true,
      },
    });

    return NextResponse.json({ book: updatedBook });
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
      include: {
        image: true,
      },
    });

    const { error } = await deleteImageFromSupabase('BookCovers', book.image.path);
    if (error) {
      throw new NextResponse('Could not delete book!', { status: 500 });
    }

    await prisma.image.delete({
      where: {
        id: book.image.id,
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
