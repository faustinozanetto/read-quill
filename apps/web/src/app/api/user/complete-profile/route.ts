import { UserCompleteProfilePostResponse } from '@modules/api/types/users-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { USER_ACTIONS_VALIDATIONS_API } from '@modules/users/validations/user.validations';
import { prisma } from '@read-quill/database';
import { auth, signIn } from 'auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// /api/user/complete-profile POST : Completes a user profile
export async function POST(request: NextRequest): Promise<NextResponse<UserCompleteProfilePostResponse>> {
  try {
    let session = await auth();

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

    const json = await request.json();
    const { name } = USER_ACTIONS_VALIDATIONS_API.COMPLETE_PROFILE.parse(json);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { name, profileCompleted: true },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
