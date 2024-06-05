import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ANNOTATION_ACTIONS_VALIDATIONS_API } from '@modules/annotations/lib/annotations.validations';

import { auth } from 'auth';
import {
  AnnotationGetResponse,
  AnnotationPostResponse,
  AnnotationPatchResponse,
  AnnotationDeleteResponse,
} from '@modules/api/types/annotations-api.types';

// /api/annotation GET : Get a annotation by a annotationId
export async function GET(request: NextRequest): Promise<NextResponse<AnnotationGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const annotationId = searchParams.get('annotationId');

    if (!annotationId) {
      return NextResponse.json(
        {
          error: {
            message: 'Annotation ID is required!',
          },
        },
        { status: 400 }
      );
    }

    const annotation = await prisma.annotation.findUnique({ where: { id: annotationId } });
    if (!annotation) {
      return NextResponse.json(
        {
          error: {
            message: 'Annotation not found!',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: { annotation } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/book/annotation POST : creates a book annotation
export async function POST(request: NextRequest): Promise<NextResponse<AnnotationPostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          error: {
            message: 'You must be logged in!',
          },
        },
        { status: 403 }
      );
    }

    const json = await request.json();
    const { bookId, content, chapter, title } = ANNOTATION_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) {
      return NextResponse.json(
        {
          error: {
            message: 'Book not found!',
          },
        },
        { status: 404 }
      );
    }

    const isBookOwner = book.readerId === session.user.id;
    if (!isBookOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the book owner!',
          },
        },
        { status: 403 }
      );
    }

    const annotation = await prisma.annotation.create({
      data: {
        bookId,
        content,
        chapter,
        title,
      },
    });

    return NextResponse.json({ data: { annotation } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/book/annotation PATCH : edits a book annotation
export async function PATCH(request: NextRequest): Promise<NextResponse<AnnotationPatchResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          error: {
            message: 'You must be logged in!',
          },
        },
        { status: 403 }
      );
    }

    const json = await request.json();
    const { annotationId, content, chapter, title } = ANNOTATION_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

    const annotation = await prisma.annotation.findUnique({
      where: {
        id: annotationId,
      },
      include: {
        book: {
          select: { readerId: true },
        },
      },
    });
    if (!annotation) {
      return NextResponse.json(
        {
          error: {
            message: 'Annotation not found!',
          },
        },
        { status: 404 }
      );
    }

    const isAnnotationOwner = annotation.book?.readerId === session.user.id;
    if (!isAnnotationOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the book owner!',
          },
        },
        { status: 403 }
      );
    }

    const updatedAnnotation = await prisma.annotation.update({
      where: {
        id: annotationId,
      },
      data: {
        content,
        chapter,
        title,
      },
    });

    return NextResponse.json({ data: { annotation: updatedAnnotation } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/book/annotation DELETE : deletes a book annotation
export async function DELETE(request: NextRequest): Promise<NextResponse<AnnotationDeleteResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          error: {
            message: 'You must be logged in!',
          },
        },
        { status: 403 }
      );
    }

    const json = await request.json();
    const { annotationId } = ANNOTATION_ACTIONS_VALIDATIONS_API.DELETE.parse(json);

    const annotation = await prisma.annotation.findUnique({
      where: {
        id: annotationId,
      },
      include: {
        book: {
          select: { readerId: true },
        },
      },
    });
    if (!annotation) {
      return NextResponse.json(
        {
          error: {
            message: 'Annotation not found!',
          },
        },
        { status: 404 }
      );
    }

    const isAnnotationOwner = annotation.book?.readerId === session.user.id;
    if (!isAnnotationOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the book owner!',
          },
        },
        { status: 403 }
      );
    }

    await prisma.annotation.delete({
      where: {
        id: annotationId,
      },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
