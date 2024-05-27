import { BookAnnotationPatchResponse } from '@modules/api/types/books-api.types';
import { useBookStore } from '@modules/books/state/book.slice';

import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { EditAnnotationFormActionData } from '../types/annotation-validations.types';
import { Annotation } from '@read-quill/database';

interface UseBookAnnotationEditReturn {
  editAnnotation: UseMutationResult<BookAnnotationPatchResponse, Error, EditAnnotationFormActionData>['mutateAsync'];
}

interface UseBookAnnotationEditParams {
  annotation: Annotation;
  onSuccess: NonNullable<
    UseMutationOptions<BookAnnotationPatchResponse, Error, EditAnnotationFormActionData>['onSuccess']
  >;
}

export const useBookAnnotationEdit = (params: UseBookAnnotationEditParams): UseBookAnnotationEditReturn => {
  const { annotation, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<BookAnnotationPatchResponse, Error, EditAnnotationFormActionData>({
    mutationKey: ['book-annotation-edit', annotation.id],
    mutationFn: async (data) => {
      const url = new URL('/api/annotations', __URL__);
      const body = JSON.stringify({
        annotationId: annotation.id,
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      if (!response.ok) {
        throw new Error('Could not edit book annotation!');
      }

      return response.json();
    },
    onSuccess: async (data, variables, context) => {
      if (data && data.annotation) {
        onSuccess(data, variables, context);

        toast({ variant: 'success', content: `Book annotation edited successfully!` });
      }
    },
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    editAnnotation: mutateAsync,
  };
};
