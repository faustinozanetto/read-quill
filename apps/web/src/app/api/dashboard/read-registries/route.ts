import { authOptions } from '@modules/auth/lib/auth.lib';
import { createReadRegistryValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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
