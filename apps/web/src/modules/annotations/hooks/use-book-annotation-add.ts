import { BookAnnotationPostResponse } from '@modules/api/types/books-api.types';
import { useBookStore } from '@modules/books/state/book.slice';

import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { CreateAnnotationFormActionData } from '../types/annotation-validations.types';

interface UseBookAnnotationAddReturn {
  addAnnotation: UseMutationResult<BookAnnotationPostResponse, Error, CreateAnnotationFormActionData>['mutateAsync'];
}

interface UseBookAnnotationAddParams {
  onSuccess: NonNullable<
    UseMutationOptions<BookAnnotationPostResponse, Error, CreateAnnotationFormActionData>['onSuccess']
  >;
}

export const useBookAnnotationAdd = (params: UseBookAnnotationAddParams): UseBookAnnotationAddReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation<BookAnnotationPostResponse, Error, CreateAnnotationFormActionData>({
    mutationKey: ['book-annotation-add', book?.id],
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
    onSuccess: async (data, variables, context) => {
      if (!book) return;

      if (data && data.annotation) {
        onSuccess(data, variables, context);

        toast({ variant: 'success', content: `Book annotation added successfully!` });
      }
    },
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    addAnnotation: mutateAsync,
  };
};
