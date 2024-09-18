import { UserDeleteResponse, UserGetResponse } from '@modules/api/types/users-api.types';
import { USER_SETTINGS_ACTIONS_VALIDATIONS_API } from '@modules/users/validations/user-settings.validations';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// /api/user GET : Gets a user by a given userId
export async function GET(request: NextRequest): Promise<NextResponse<UserGetResponse>> {
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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        avatar: true,
      },
    });
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

    return NextResponse.json({ data: { user } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/user DELETE : deletes a user account
export async function DELETE(request: NextRequest): Promise<NextResponse<UserDeleteResponse>> {
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
    const { accountEmail, deleteConfirmation } = USER_SETTINGS_ACTIONS_VALIDATIONS_API.DELETE_ACCOUNT.parse(json);

    if (session.user.email !== accountEmail) {
      return NextResponse.json(
        {
          error: {
            message: 'Unauthorized',
          },
        },
        { status: 403 }
      );
    }

    if (deleteConfirmation !== 'delete-account') {
      return NextResponse.json(
        {
          error: {
            message: 'Unauthorized',
          },
        },
        { status: 403 }
      );
    }

    await prisma.user.delete({
      where: {
        email: session.user.email,
      },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
