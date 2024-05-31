import { BookAnnotationDeleteResponse } from '@modules/api/types/books-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { Annotation } from '@read-quill/database';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type DeleteBookAnnotationMutationResult = UseMutationResult<BookAnnotationDeleteResponse, Error, void>;
type DeleteBookAnnotationMutationParams = UseMutationOptions<BookAnnotationDeleteResponse, Error, void>;

interface UseDeleteBookAnnotationReturn {
  deleteAnnotation: DeleteBookAnnotationMutationResult['mutateAsync'];
}

interface UseDeleteBookAnnotationParams {
  annotation: Annotation;
  onSuccess: NonNullable<DeleteBookAnnotationMutationParams['onSuccess']>;
}

export const useDeleteBookAnnotation = (params: UseDeleteBookAnnotationParams): UseDeleteBookAnnotationReturn => {
  const { annotation, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<BookAnnotationDeleteResponse, Error, void>({
    mutationKey: ['delete-book-annotation', annotation.id],
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
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    deleteAnnotation: mutateAsync,
  };
};
