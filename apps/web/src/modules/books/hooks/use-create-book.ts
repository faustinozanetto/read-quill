import { BookPostResponse } from '@modules/api/types/books-api.types';
import { CreateBookFormActionData } from '@modules/books/types/book-validations.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useUploadBookCover } from './use-upload-book-cover';

type CreateBookMutationResult = UseMutationResult<BookPostResponse, Error, CreateBookFormActionData>;
type CreateBookMutationParams = UseMutationOptions<BookPostResponse, Error, CreateBookFormActionData>;

interface UseCreateBookReturn {
  createBook: CreateBookMutationResult['mutateAsync'];
  isCoverUploading: boolean;
}

export interface UseCreateBookParams {
  onSuccess: NonNullable<CreateBookMutationParams['onSuccess']>;
}

export const useCreateBook = (params: UseCreateBookParams): UseCreateBookReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();
  const { uploadCover, isLoading } = useUploadBookCover();

  const { mutateAsync } = useMutation<BookPostResponse, Error, CreateBookFormActionData>({
    mutationKey: ['book-add'],
    mutationFn: async (data) => {
      // First upload cover book to vercel blob storage.
      const coverFile = await uploadCover({ coverImage: data.coverImage });

      const url = new URL('/api/book', __URL__);
      const body = JSON.stringify({
        name: data.name,
        author: data.author,
        language: data.language,
        imageId: coverFile.coverImage.id,
        pageCount: data.pageCount,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not create book!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    createBook: mutateAsync,
    isCoverUploading: isLoading,
  };
};
