import { UserProfileCompletedGetResponse } from '@modules/api/types/users-api.types';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { NextResponse } from 'next/server';
import { useSession } from 'next-auth/react';

// /api/user/profile-completed GET : Gets a user by a given userId
export async function GET(request: NextRequest): Promise<NextResponse<UserProfileCompletedGetResponse>> {
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

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
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

    return NextResponse.json({ data: { profileCompleted: user.profileCompleted } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
