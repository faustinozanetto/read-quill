import { authOptions } from '@modules/auth/lib/auth.lib';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

// /api/user/books GET : Gets the books of a user by a given userId
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new NextResponse('User ID is missing', { status: 400 });
    }

    const books = await prisma.book.findMany({ where: { readerId: userId } });
    return NextResponse.json({ books });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
