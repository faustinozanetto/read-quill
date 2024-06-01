import { NextResponse } from 'next/server';
import type { BookUploadPostResponse } from '@modules/api/types/books-api.types';
import { convertFileToWebp, uploadImageToSupabase } from '@modules/uploads/lib/uploads.lib';
import { prisma } from '@read-quill/database';

export async function POST(request: Request): Promise<NextResponse<BookUploadPostResponse>> {
  try {
    const formData = await request.formData();

    const coverFile = formData.get('coverFile') as Blob | null;

    if (!coverFile) {
      return new NextResponse('File blob is required.', { status: 400 });
    }

    // Upload file to supabase
    const processedBlob = await convertFileToWebp(coverFile);
    const suffix = Math.round(Math.random() * 1e9).toString();
    const uploadResult = await uploadImageToSupabase('BookCovers', '', suffix, processedBlob);
    if (uploadResult.error) {
      return new NextResponse('Failed to upload book cover.', { status: 500 });
    }

    // Create image
    const coverImage = await prisma.image.create({
      data: {
        path: uploadResult.data.path,
      },
    });

    return NextResponse.json({ coverImage });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
