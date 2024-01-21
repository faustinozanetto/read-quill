import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createReadRegistryValidationSchema,
  deleteReadRegistryValidationSchema,
  editReadRegistryValidationSchema,
} from '@modules/dashboard/validations/dashboard.validations';
import { authOptions } from '@modules/auth/lib/auth.lib';

// /api/dashboard/read-registries GET : Gets the read registries
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Fetch read registries for the current page
    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { reader: { id: session.user.id } } },
      include: { book: { select: { pageCount: true, coverImage: true, name: true } } },
      skip: pageSize * pageIndex,
      take: pageSize,
    });

    // Fetch the total count of read registries
    const totalCount = await prisma.readRegistry.count({
      where: { book: { reader: { id: session.user.id } } },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);

    return NextResponse.json({ readRegistries, pageCount });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/dashboard/read-registries POST : Creates a read registry
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId, pagesRead } = createReadRegistryValidationSchema.parse(json);

    await prisma.readRegistry.create({
      data: {
        bookId,
        pagesRead,
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

// /api/dashboard/read-registries PATCH : Edits a read registry
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { registryId, pagesRead } = editReadRegistryValidationSchema.parse(json);

    await prisma.readRegistry.update({
      where: { id: registryId },
      data: {
        pagesRead,
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

// /api/dashboard/read-registries DELETE : Deletes a read registry
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { registryId } = deleteReadRegistryValidationSchema.parse(json);

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
