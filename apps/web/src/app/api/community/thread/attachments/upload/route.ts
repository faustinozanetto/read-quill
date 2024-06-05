import { NextRequest, NextResponse } from 'next/server';

import { ThreadAttachmentUploadPostResponse } from '@modules/api/types/community-api.types';
import { convertFileToWebp, uploadImageToSupabase } from '@modules/uploads/lib/uploads.lib';
import { FileUploadResult } from '@modules/uploads/types/uploads.types';
import { Prisma, prisma } from '@read-quill/database';

const extractFileNameWithoutExtension = (filePath: string) => {
  // Extract the part after the last backslash or forward slash
  const lastSegment = filePath.split(/[/\\]/).pop();
  if (!lastSegment) return null;

  // Find the position of the first hyphen after the timestamp
  const firstHyphenIndex = lastSegment.indexOf('-');

  // Find the position of the last dot
  const lastDotIndex = lastSegment.lastIndexOf('.');

  if (firstHyphenIndex !== -1 && lastDotIndex !== -1 && firstHyphenIndex < lastDotIndex) {
    // Extract the filename without the timestamp and the extension
    return lastSegment.substring(firstHyphenIndex + 1, lastDotIndex);
  }

  return null; // or handle the case where the format is unexpected
};

// /api/community/thread/attachments/upload POST : Uploads thread attachments
export async function POST(request: NextRequest): Promise<NextResponse<ThreadAttachmentUploadPostResponse>> {
  try {
    const formData = await request.formData();
    const threadId = formData.get('threadId') as string | null;
    if (!threadId) {
      return NextResponse.json({ error: { message: 'Thread ID is missing!' } }, { status: 400 });
    }

    const attachmentDescriptions: Record<string, string> = {};
    const uploadPromises: Promise<FileUploadResult>[] = [];
    // Extract data from formData
    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (key === 'threadId') continue;

      const file = value as File | null;
      if (!file) continue;

      if (key.endsWith('-description')) continue;

      const description = formData.get(`${key}-description`) || file.name;
      attachmentDescriptions[key] = description as string;

      // Process the file before uploading
      const processedBlob = await convertFileToWebp(file);
      // Add the file upload promise to the array
      const filePath = `${threadId.toString()}`;
      uploadPromises.push(uploadImageToSupabase('ThreadAttachments', filePath, key, processedBlob));
    }

    // Wait for all uploads to complete
    const uploadedAttachments = await Promise.all(uploadPromises);
    const uploadFailed = uploadedAttachments.some((attachment) => attachment === undefined);
    if (uploadFailed) {
      return NextResponse.json({ error: { message: 'Failed to upload thread attachment!' } }, { status: 400 });
    }

    const uploadedPaths = uploadedAttachments
      .filter((attachment) => attachment.data && attachment.data.path)
      .map((attachment) => attachment.data?.path!);

    // Create images
    const imagesCreateData = uploadedPaths.reduce<Prisma.ImageCreateManyInput[]>((acc, curr) => {
      return [...acc, { path: curr }];
    }, []);
    const attachmentImages = await prisma.image.createManyAndReturn({
      data: imagesCreateData,
    });

    // Create attachments
    const threadAttachmentsCreateData = attachmentImages.reduce<Prisma.ThreadAttachmentCreateManyInput[]>(
      (acc, curr) => {
        const imageFileName = extractFileNameWithoutExtension(curr.path);
        if (!imageFileName) return [...acc];

        const description = attachmentDescriptions[imageFileName];
        return [...acc, { description, threadId, imageId: curr.id }];
      },
      []
    );
    const threadAttachments = await prisma.threadAttachment.createManyAndReturn({
      data: threadAttachmentsCreateData,
    });

    // Link attachments to the thread
    await prisma.thread.update({
      where: {
        id: threadId,
      },
      data: {
        attachments: { connect: threadAttachments.map((threadAttachment) => ({ id: threadAttachment.id })) },
      },
    });

    return NextResponse.json({ data: { attachmentImages } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
