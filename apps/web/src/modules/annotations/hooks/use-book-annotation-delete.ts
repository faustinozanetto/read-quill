import { BookAnnotationDeleteResponse } from '@modules/api/types/books-api.types';
import { useBookStore } from '@modules/books/state/book.slice';

import { __URL__ } from '@modules/common/lib/common.constants';
import { Annotation } from '@read-quill/database';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

interface UseBookAnnotationDeleteReturn {
  deleteAnnotation: UseMutationResult<BookAnnotationDeleteResponse, Error, void>['mutateAsync'];
}

interface UseBookAnnotationDeleteParams {
  annotation: Annotation;
  onSuccess: NonNullable<UseMutationOptions<BookAnnotationDeleteResponse, Error, void>['onSuccess']>;
}

export const useBookAnnotationDelete = (params: UseBookAnnotationDeleteParams): UseBookAnnotationDeleteReturn => {
  const { annotation, onSuccess } = params;

  const { toast } = useToast();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation<BookAnnotationDeleteResponse, Error, void>({
    mutationKey: ['book-annotation-delete', annotation.id],
    mutationFn: async () => {
      const url = new URL('/api/annotations', __URL__);
      const body = JSON.stringify({
        annotationId: annotation.id,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      if (!response.ok) {
        throw new Error('Could not delete annotation!');
      }

      return response.json();
    },
    onSuccess: async (data, variables, context) => {
      if (!book) return;

      if (data && data.success) {
        onSuccess(data, variables, context);
        toast({ variant: 'success', content: `Book annotation deleted successfully!` });
      }
    },
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    deleteAnnotation: mutateAsync,
  };
};
