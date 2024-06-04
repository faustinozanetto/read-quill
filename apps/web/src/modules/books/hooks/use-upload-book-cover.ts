import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';

import { BookCoverImageUpload } from '../types/book-validations.types';
import { BookUploadPostResponse } from '@modules/api/types/books-api.types';

type UploadBookCoverMutationResult = UseMutationResult<BookUploadPostResponse, Error, UploadBookCoverData>;

interface UploadBookCoverData {
  coverImage: BookCoverImageUpload;
}

export interface UseUploadBookCoverReturn {
  uploadCover: UploadBookCoverMutationResult['mutateAsync'];
  isLoading: UploadBookCoverMutationResult['isLoading'];
}

export const useUploadBookCover = (): UseUploadBookCoverReturn => {
  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<BookUploadPostResponse, Error, UploadBookCoverData>({
    mutationFn: async (data) => {
      const { coverImage } = data;

      if (!coverImage.length) throw new Error('No cover image provided!');

      const image = coverImage[0];
      const formData = new FormData();
      formData.append('coverFile', image);

      const url = new URL('/api/book/upload', __URL__);
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload book cover!');
      }

      return response.json();
    },
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    uploadCover: mutateAsync,
    isLoading,
  };
};
