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
import { generatePlaceholderImage } from '@modules/images/lib/image-placeholder.lib';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import { BookWithDetails } from '@modules/books/types/book.types';

// /api/book GET : Gets a book by a given bookId
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

    const base64PlaceholderBuffer = await generatePlaceholderImage(getImagePublicUrl('BookCovers', book.image.path));

    const mappedBook = {
      ...book,
      placeholderImage: {
        blurUrl: base64PlaceholderBuffer,
      },
    };

    return NextResponse.json({ book: mappedBook });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/book POST : Creates a book
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

    const base64PlaceholderBuffer = await generatePlaceholderImage(getImagePublicUrl('BookCovers', book.image.path));

    const mappedBook: BookWithDetails = {
      ...book,
      placeholderImage: {
        blurUrl: base64PlaceholderBuffer,
      },
    };

    return NextResponse.json({ book: mappedBook });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/book PATCH : updates a book
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

    const base64PlaceholderBuffer = await generatePlaceholderImage(getImagePublicUrl('BookCovers', book.image.path));

    const mappedBook: BookWithDetails = {
      ...updatedBook,
      placeholderImage: {
        blurUrl: base64PlaceholderBuffer,
      },
    };

    return NextResponse.json({ book: mappedBook });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/book DELETE : deletes a book
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
