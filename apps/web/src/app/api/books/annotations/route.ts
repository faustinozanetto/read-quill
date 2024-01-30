import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authOptions } from '@modules/auth/lib/auth.lib';
import {
  createBookAnnotationValidationSchemaAPI,
  deleteBookAnnotationValidationSchema,
  editBookAnnotationValidationSchemaAPI,
} from '@modules/annotations/lib/annotations.validations';
import type { BookAnnotationPostResponse, BookAnnotationsGetResponse } from '@modules/api/types/books-api.types';

// /api/books/annotations GET : Gets the book annotations by a given bookId
export async function GET(request: NextRequest): Promise<NextResponse<BookAnnotationsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return new NextResponse('Book ID is missing', { status: 400 });
    }

    const annotations = await prisma.annotation.findMany({ where: { bookId } });
    return NextResponse.json({ annotations });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/books/annotations POST : creates a book annotation
export async function POST(request: NextRequest): Promise<NextResponse<BookAnnotationPostResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId, content, chapter, title } = createBookAnnotationValidationSchemaAPI.parse(json);

    await prisma.annotation.create({
      data: {
        bookId,
        content,
        chapter,
        title,
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

// /api/books/annotations PATCH : edits a book annotation
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { annotationId, content, chapter, title } = editBookAnnotationValidationSchemaAPI.parse(json);

    await prisma.annotation.update({
      where: {
        id: annotationId,
      },
      data: {
        content,
        chapter,
        title,
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

// /api/books/annotations DELETE : deletes a book annotation
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { annotationId } = deleteBookAnnotationValidationSchema.parse(json);

    await prisma.annotation.delete({
      where: {
        id: annotationId,
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
