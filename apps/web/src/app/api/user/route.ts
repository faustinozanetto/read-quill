import { UserGetResponse } from '@modules/api/types/users-api.types';
import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// /api/user GET : Gets a user by a given userId
export async function GET(request: NextRequest): Promise<NextResponse<UserGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new NextResponse('User ID is missing', { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NextResponse('User not found!', { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
