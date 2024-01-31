import mime from 'mime';
import sharp from 'sharp';
import { NextResponse } from 'next/server';
import type { BooksUploadPostResponse } from '@modules/api/types/books-api.types';
import { supabase } from '@modules/supabase/lib/supabase.lib';

async function handleFileUpload(file: Blob): Promise<string | undefined> {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;

  const { data } = await supabase.storage.from('BookCovers').upload(filename, file, {
    cacheControl: '3600',
    upsert: false,
  });

  return data?.path;
}

async function processFile(file: Blob): Promise<Blob> {
  const processedFile = await sharp(await file.arrayBuffer())
    .webp()
    .toBuffer();
  const processedBlob = new Blob([processedFile], { type: 'image/webp' });
  return processedBlob;
}

export async function POST(request: Request): Promise<NextResponse<BooksUploadPostResponse | { error: string }>> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'File blob is required.' }, { status: 400 });
    }

    const processedBlob = await processFile(file);

    const supabaseFilePath = await handleFileUpload(processedBlob);
    if (!supabaseFilePath) {
      return NextResponse.json({ error: 'Failed to upload book cover.' }, { status: 400 });
    }

    const { data } = supabase.storage.from('BookCovers').getPublicUrl(supabaseFilePath);

    const fileUrl = data.publicUrl;

    return NextResponse.json({ fileUrl });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
