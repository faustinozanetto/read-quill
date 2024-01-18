import type { PutBlobResult } from '@vercel/blob';
import { useState } from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';

interface UseUploadBookCoverReturn {
  uploadBookCover: (coverFile: File) => Promise<PutBlobResult>;
  isBookCoverUploading: boolean;
}

export const useUploadBookCover = (): UseUploadBookCoverReturn => {
  const [isBookCoverUploading, setIsBookCoverUploading] = useState(false);

  const uploadBookCover = async (coverFile: File): Promise<PutBlobResult> => {
    setIsBookCoverUploading(true);

    const url = new URL('/api/books/upload', __URL__);
    url.searchParams.set('filename', coverFile.name);

    const response = await fetch(url, {
      method: 'POST',
      body: coverFile,
    });

    if (!response.ok) {
      throw new Error('Failed to upload book cover!');
    }

    const coverBlob = (await response.json()) as PutBlobResult;
    setIsBookCoverUploading(false);

    return coverBlob;
  };

  return { uploadBookCover, isBookCoverUploading };
};
