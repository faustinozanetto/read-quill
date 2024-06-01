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

// /api/book/annotation POST : creates a book annotation
export async function POST(request: NextRequest): Promise<NextResponse<AnnotationPostResponse>> {
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

// /api/book/annotation PATCH : edits a book annotation
export async function PATCH(request: NextRequest): Promise<NextResponse<AnnotationPatchResponse>> {
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

// /api/book/annotation DELETE : deletes a book annotation
export async function DELETE(request: NextRequest): Promise<NextResponse<AnnotationDeleteResponse>> {
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
