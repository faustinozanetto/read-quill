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

// /api/book DELETE : deletes a book
export async function DELETE(request: NextRequest): Promise<NextResponse<UserDeleteResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { accountEmail, deleteConfirmation } = USER_SETTINGS_ACTIONS_VALIDATIONS_API.DELETE_ACCOUNT.parse(json);

    if (session.user.email !== accountEmail) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    if (deleteConfirmation !== 'delete-account') {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    await prisma.user.delete({
      where: {
        email: session.user.email,
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
