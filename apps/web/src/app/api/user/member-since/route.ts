import { UserMemberSinceGetResponse } from '@modules/api/types/users-api.types';
import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// /api/user/member-since GET : Gets since when a user has been a member
export async function GET(request: NextRequest): Promise<NextResponse<UserMemberSinceGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        {
          error: {
            message: 'User ID is required!',
          },
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        {
          error: {
            message: 'User not found!',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: { memberSince: user.createdAt } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
