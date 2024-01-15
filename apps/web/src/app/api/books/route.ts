import { authOptions } from '@modules/auth/lib/auth.lib';
import {
  createBookValidationSchemaAPI,
  deleteBookValidationSchemaForm,
  editBookValidationSchemaAPI,
} from '@modules/books/validations/books.validations';
import { prisma } from '@read-quill/database';
import { del } from '@vercel/blob';
import { getServerSession } from 'next-auth/next';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

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
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const email = session.user?.email;
    if (!email) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();

    const { name, author, coverImage, language, pageCount } = createBookValidationSchemaAPI.parse(json);

    const book = await prisma.book.create({
      data: {
        name,
        author,
        language,
        pageCount,
        coverImage,
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
export async function PATCH(request: NextRequest): Promise<NextResponse> {
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

    const { bookId, ...updateData } = editBookValidationSchemaAPI.parse(json);

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
export async function DELETE(request: NextRequest): Promise<NextResponse> {
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
    const { bookId } = deleteBookValidationSchemaForm.parse(json);

    const book = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    // Delete vercel cover image
    const urlToDelete = book.coverImage;
    await del(urlToDelete);

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
