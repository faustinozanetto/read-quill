import mime from 'mime';
import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@modules/supabase/lib/supabase.lib';
import { ThreadAttachmentUploadPostResponse } from '@modules/api/types/community-api.types';

async function handleFileUpload(fileName: string, blob: Blob): Promise<string | undefined> {
  const uniqueSuffix = `${Date.now()}-${fileName}`;
  const filename = `${uniqueSuffix}.${mime.getExtension(blob.type)}`;

  const { data } = await supabase.storage.from('ThreadAttachments').upload(filename, blob, {
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

export async function POST(request: NextRequest): Promise<NextResponse<ThreadAttachmentUploadPostResponse>> {
  try {
    const formData = await request.formData();

    const uploadPromises: Promise<string | undefined>[] = [];

    for (const pair of formData.entries()) {
      const [key, value] = pair;
      const file = value as File | null;
      if (!file) continue;

      // Process the file before uploading
      const processedBlob = await processFile(file);
      // Add the file upload promise to the array
      uploadPromises.push(handleFileUpload(key, processedBlob));
    }

    // Wait for all uploads to complete
    const uploadedPaths = await Promise.all(uploadPromises);
    const uploadFailed = uploadedPaths.some((path) => path === undefined);
    if (uploadFailed) {
      return NextResponse.json({ error: 'Failed to upload book cover.' }, { status: 400 });
    }

    // Build public urls record
    const attachmentUrls = uploadedPaths.reduce<Record<string, string>>((acc, path) => {
      if (!path) return acc;

      const {
        data: { publicUrl },
      } = supabase.storage.from('ThreadAttachments').getPublicUrl(path);
      acc[path] = publicUrl;

      return acc;
    }, {});

    return NextResponse.json({ attachmentUrls });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
