import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ANNOTATION_ACTIONS_VALIDATIONS_API } from '@modules/annotations/lib/annotations.validations';
import type {
  BookAnnotationDeleteResponse,
  BookAnnotationGetResponse,
  BookAnnotationPatchResponse,
  BookAnnotationPostResponse,
  BookAnnotationsGetResponse,
} from '@modules/api/types/books-api.types';
import { auth } from 'auth';

// /api/annotations GET : Gets the book annotations by a given bookId
export async function GET(request: NextRequest): Promise<NextResponse<BookAnnotationGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const annotationId = searchParams.get('annotationId');

    if (!annotationId) {
      return new NextResponse('Annotation ID is missing', { status: 400 });
    }

    const annotation = await prisma.annotation.findUnique({ where: { id: annotationId } });
    if (!annotation) {
      return new NextResponse('Annotation not found!', { status: 404 });
    }

    return NextResponse.json({ annotation });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/books/annotations POST : creates a book annotation
export async function POST(request: NextRequest): Promise<NextResponse<BookAnnotationPostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId, content, chapter, title } = ANNOTATION_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const annotation = await prisma.annotation.create({
      data: {
        bookId,
        content,
        chapter,
        title,
      },
    });

    return NextResponse.json({ annotation });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/books/annotations PATCH : edits a book annotation
export async function PATCH(request: NextRequest): Promise<NextResponse<BookAnnotationPatchResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { annotationId, content, chapter, title } = ANNOTATION_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

    const annotation = await prisma.annotation.update({
      where: {
        id: annotationId,
      },
      data: {
        content,
        chapter,
        title,
      },
    });

    return NextResponse.json({ annotation });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/books/annotations DELETE : deletes a book annotation
export async function DELETE(request: NextRequest): Promise<NextResponse<BookAnnotationDeleteResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { annotationId } = ANNOTATION_ACTIONS_VALIDATIONS_API.DELETE.parse(json);

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
