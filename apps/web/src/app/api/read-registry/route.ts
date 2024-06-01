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
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId, pagesRead } = READ_REGISTRY_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const readRegistry = await prisma.readRegistry.create({
      data: {
        bookId,
        pagesRead,
      },
    });

    return NextResponse.json({ readRegistry });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/read-registry PATCH : Edits a read registry
export async function PATCH(request: NextRequest): Promise<NextResponse<ReadRegistryPatchResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { registryId, pagesRead } = READ_REGISTRY_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

    const readRegistry = await prisma.readRegistry.update({
      where: { id: registryId },
      data: {
        pagesRead,
      },
    });

    return NextResponse.json({ readRegistry });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/read-registry DELETE : Deletes a read registry
export async function DELETE(request: NextRequest): Promise<NextResponse<ReadRegistryDeleteResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { registryId } = READ_REGISTRY_ACTIONS_VALIDATIONS_API.DELETE.parse(json);

    await prisma.readRegistry.delete({
      where: { id: registryId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
