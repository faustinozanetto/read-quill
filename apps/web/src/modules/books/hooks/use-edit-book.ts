import { BookPatchResponse } from '@modules/api/types/books-api.types';
import { EditBookFormActionData } from '@modules/books/types/book-validations.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useUploadBookCover } from './use-upload-book-cover';
import { BookWithDetails } from '../types/book.types';

type EditBookMutationResult = UseMutationResult<BookPatchResponse, Error, EditBookFormActionData>;
type EditBookMutationParams = UseMutationOptions<BookPatchResponse, Error, EditBookFormActionData>;

interface UseEditBookReturn {
  editBook: EditBookMutationResult['mutateAsync'];
  isCoverUploading: boolean;
}

interface UseEditBookParams {
  book: BookWithDetails | null;
  onSuccess: NonNullable<EditBookMutationParams['onSuccess']>;
}

export const useEditBook = (params: UseEditBookParams): UseEditBookReturn => {
  const { book, onSuccess } = params;

  const { toast } = useToast();
  const { uploadCover, isLoading } = useUploadBookCover();

  const { mutateAsync } = useMutation<BookPatchResponse, Error, EditBookFormActionData>({
    mutationKey: ['book-edit'],
    mutationFn: async (data) => {
      if (!book) return;
      const { coverImage, startedAt, finishedAt, ...rest } = data;

      let imageId: string | undefined;
      if (coverImage && coverImage.length > 0) {
        const coverFile = await uploadCover({ coverImage });
        imageId = coverFile.coverImage.id;
      }

      const url = new URL('/api/books', __URL__);
      const body = JSON.stringify({
        bookId: book.id,
        startedAt: startedAt ? new Date(startedAt) : undefined,
        finishedAt: finishedAt ? new Date(finishedAt) : undefined,
        imageId,
        ...rest,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      if (!response.ok) {
        throw new Error('Could not edit book!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    editBook: mutateAsync,
    isCoverUploading: isLoading,
  };
};
