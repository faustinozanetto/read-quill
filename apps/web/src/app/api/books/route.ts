import { authOptions } from '@modules/auth/lib/auth.lib';
import { createBookValidationSchemaAPI } from '@modules/books/validations/books.validations';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

// /api/books/ POST : creates a book
export async function POST(request: NextRequest) {
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
    });

    return NextResponse.json({ book });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
