import { useState } from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { BooksUploadPostResponse } from '@modules/api/types/books-api.types';

interface UseUploadBookCoverReturn {
  uploadBookCover: (coverFile: File) => Promise<BooksUploadPostResponse>;
  isBookCoverUploading: boolean;
}

export const useUploadBookCover = (): UseUploadBookCoverReturn => {
  const [isBookCoverUploading, setIsBookCoverUploading] = useState(false);

  const uploadBookCover = async (coverFile: File): Promise<BooksUploadPostResponse> => {
    setIsBookCoverUploading(true);

    const formData = new FormData();
    formData.append('file', coverFile);

    const url = new URL('/api/books/upload', __URL__);
    url.searchParams.set('filename', coverFile.name);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload book cover!');
    }

    const data: BooksUploadPostResponse = await response.json();

    setIsBookCoverUploading(false);
    return data;
  };

  return { uploadBookCover, isBookCoverUploading };
};
