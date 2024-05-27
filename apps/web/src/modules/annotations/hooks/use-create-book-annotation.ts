import { BookAnnotationPostResponse } from '@modules/api/types/books-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { CreateAnnotationFormActionData } from '../types/annotation-validations.types';
import { BookWithDetails } from '@modules/books/types/book.types';

type CreateBookAnnotationMutationResult = UseMutationResult<
  BookAnnotationPostResponse,
  Error,
  CreateAnnotationFormActionData
>;
type CreateBookAnnotationMutationParams = UseMutationOptions<
  BookAnnotationPostResponse,
  Error,
  CreateAnnotationFormActionData
>;

interface UseCreateBookAnnotationReturn {
  createAnnotation: CreateBookAnnotationMutationResult['mutateAsync'];
}

interface UseCreateBookAnnotationParams {
  book: BookWithDetails | null;
  onSuccess: NonNullable<CreateBookAnnotationMutationParams['onSuccess']>;
}

export const useCreateBookAnnotation = (params: UseCreateBookAnnotationParams): UseCreateBookAnnotationReturn => {
  const { book, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<BookAnnotationPostResponse, Error, CreateAnnotationFormActionData>({
    mutationKey: ['create-book-annotation', book?.id],
    mutationFn: async (data) => {
      if (!book) return;

      const url = new URL('/api/annotations', __URL__);
      const body = JSON.stringify({
        bookId: book.id,
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not add book annotation!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    createAnnotation: mutateAsync,
  };
};
