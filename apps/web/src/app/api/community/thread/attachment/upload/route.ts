import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@modules/supabase/lib/supabase.lib';
import { ThreadAttachmentUploadPostResponse } from '@modules/api/types/community-api.types';
import { convertFileToWebp, uploadFileToSupabase } from '@modules/uploads/lib/uploads.lib';
import { FileUploadResult } from '@modules/uploads/types/uploads.types';

export async function POST(request: NextRequest): Promise<NextResponse<ThreadAttachmentUploadPostResponse>> {
  try {
    const formData = await request.formData();

    const uploadPromises: Promise<FileUploadResult>[] = [];

    for (const pair of formData.entries()) {
      const [key, value] = pair;
      const file = value as File | null;
      if (!file) continue;

      // Process the file before uploading
      const processedBlob = await convertFileToWebp(file);
      // Add the file upload promise to the array
      uploadPromises.push(uploadFileToSupabase(key, 'ThreadAttachments', processedBlob));
    }

    // Wait for all uploads to complete
    const uploadedPaths = await Promise.all(uploadPromises);
    const uploadFailed = uploadedPaths.some((path) => path === undefined);
    if (uploadFailed) {
      return new NextResponse('Failed to upload thread attachment!', { status: 400 });
    }

    // Build public urls record
    const attachmentUrls = uploadedPaths.reduce<Record<string, string>>((acc, uploadResult) => {
      const { data } = uploadResult;
      if (!data) return acc;

      // Get attachment public url from supabase
      const {
        data: { publicUrl },
      } = supabase.storage.from('ThreadAttachments').getPublicUrl(data.path);
      acc[data.path] = publicUrl;

      return acc;
    }, {});

    return NextResponse.json({ attachmentUrls });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
