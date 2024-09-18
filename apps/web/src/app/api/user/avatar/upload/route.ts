import { NextResponse } from 'next/server';
import { convertFileToWebp, uploadImageToSupabase } from '@modules/uploads/lib/uploads.lib';
import { prisma } from '@read-quill/database';
import { UserAvatarUploadPostResponse } from '@modules/api/types/users-api.types';

// /api/user/avatar/upload POST : Uploads an avatar user file.
export async function POST(request: Request): Promise<NextResponse<UserAvatarUploadPostResponse>> {
  try {
    const formData = await request.formData();

    const avatarFile = formData.get('avatarFile') as Blob | null;

    if (!avatarFile) {
      return NextResponse.json(
        {
          error: {
            message: 'Avatar file is required!',
          },
        },
        { status: 400 }
      );
    }

    // Upload file to supabase
    const processedBlob = await convertFileToWebp(avatarFile);
    const suffix = Math.round(Math.random() * 1e9).toString();
    const uploadResult = await uploadImageToSupabase('UserAvatars', '', suffix, processedBlob);
    if (uploadResult.error) {
      return NextResponse.json(
        {
          error: {
            message: 'Failed to upload avatar file!',
          },
        },
        { status: 500 }
      );
    }

    // Create image
    const avatarImage = await prisma.image.create({
      data: {
        path: uploadResult.data.path,
      },
    });

    return NextResponse.json({ data: { avatarImage } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
