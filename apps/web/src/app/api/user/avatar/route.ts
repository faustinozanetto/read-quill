import { UserAvatarDeleteResponse } from '@modules/api/types/users-api.types';
import { deleteImageFromSupabase } from '@modules/uploads/lib/uploads.lib';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

// /api/user/avatar DELETE : Deletes the current user avatar
export async function DELETE(request: NextRequest): Promise<NextResponse<UserAvatarDeleteResponse>> {
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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { avatar: true },
    });

    if (!user?.avatar) {
      return NextResponse.json(
        {
          data: {
            success: true,
          },
        },
        { status: 200 }
      );
    }

    const { error } = await deleteImageFromSupabase('UserAvatars', user.avatar.path);
    if (error) {
      return NextResponse.json(
        {
          error: {
            message: 'Failed to delete user avatar!',
          },
        },
        { status: 500 }
      );
    }

    await prisma.image.delete({
      where: { id: user.avatar.id },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
