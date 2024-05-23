import { NextResponse } from 'next/server';
import type { BooksUploadPostResponse } from '@modules/api/types/books-api.types';
import { supabase } from '@modules/supabase/lib/supabase.lib';
import { convertFileToWebp, uploadFileToSupabase } from '@modules/uploads/lib/uploads.lib';

export async function POST(request: Request): Promise<NextResponse<BooksUploadPostResponse | { error: string }>> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'File blob is required.' }, { status: 400 });
    }

    const processedBlob = await convertFileToWebp(file);

    const suffix = Math.round(Math.random() * 1e9);
    const uploadPromises = await uploadFileToSupabase(suffix.toString(), 'BookCovers', processedBlob);
    if (!uploadPromises.data) {
      return NextResponse.json({ error: 'Failed to upload book cover.' }, { status: 400 });
    }

    const { data } = supabase.storage.from('BookCovers').getPublicUrl(uploadPromises.data.path);

    const fileUrl = data.publicUrl;

    return NextResponse.json({ fileUrl });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
