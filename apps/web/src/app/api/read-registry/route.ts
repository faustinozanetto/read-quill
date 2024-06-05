import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from 'auth';
import { READ_REGISTRY_ACTIONS_VALIDATIONS_API } from '@modules/read-registries/lib/read-registries.validations';
import {
  ReadRegistryDeleteResponse,
  ReadRegistryPatchResponse,
  ReadRegistryPostResponse,
} from '@modules/api/types/read-registries-api.types';

// /api/read-registry POST : Creates a read registry
export async function POST(request: NextRequest): Promise<NextResponse<ReadRegistryPostResponse>> {
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
    const { bookId, pagesRead } = READ_REGISTRY_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const book = await prisma.book.findUnique({
      where: { id: bookId },
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

    const readRegistry = await prisma.readRegistry.create({
      data: {
        bookId,
        pagesRead,
      },
    });

    return NextResponse.json({ data: { readRegistry } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/read-registry PATCH : Edits a read registry
export async function PATCH(request: NextRequest): Promise<NextResponse<ReadRegistryPatchResponse>> {
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
    const { registryId, pagesRead } = READ_REGISTRY_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

    const readRegistry = await prisma.readRegistry.findUnique({
      where: { id: registryId },
      include: {
        book: { select: { readerId: true } },
      },
    });

    if (!readRegistry) {
      return NextResponse.json(
        {
          error: {
            message: 'Read registry not found!',
          },
        },
        { status: 404 }
      );
    }

    const isReadRegistryOwner = readRegistry.book.readerId === session.user.id;
    if (!isReadRegistryOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the book owner!',
          },
        },
        { status: 403 }
      );
    }

    const updatedReadRegistry = await prisma.readRegistry.update({
      where: { id: registryId },
      data: {
        pagesRead,
      },
    });

    return NextResponse.json({ data: { readRegistry: updatedReadRegistry } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/read-registry DELETE : Deletes a read registry
export async function DELETE(request: NextRequest): Promise<NextResponse<ReadRegistryDeleteResponse>> {
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
    const { registryId } = READ_REGISTRY_ACTIONS_VALIDATIONS_API.DELETE.parse(json);

    const readRegistry = await prisma.readRegistry.findUnique({
      where: { id: registryId },
      include: {
        book: { select: { readerId: true } },
      },
    });

    if (!readRegistry) {
      return NextResponse.json(
        {
          error: {
            message: 'Read registry not found!',
          },
        },
        { status: 404 }
      );
    }

    const isReadRegistryOwner = readRegistry.book.readerId === session.user.id;
    if (!isReadRegistryOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the book owner!',
          },
        },
        { status: 403 }
      );
    }

    await prisma.readRegistry.delete({
      where: { id: registryId },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
