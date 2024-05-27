import { BookAnnotationPatchResponse } from '@modules/api/types/books-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { EditAnnotationFormActionData } from '../types/annotation-validations.types';
import { Annotation } from '@read-quill/database';

type EditBookAnnotationMutationResult = UseMutationResult<
  BookAnnotationPatchResponse,
  Error,
  EditAnnotationFormActionData
>;
type EditBookAnnotationMutationParams = UseMutationOptions<
  BookAnnotationPatchResponse,
  Error,
  EditAnnotationFormActionData
>;

interface UseEditBookAnnotationReturn {
  editAnnotation: EditBookAnnotationMutationResult['mutateAsync'];
}

interface UseEditBookAnnotationParams {
  annotation: Annotation;
  onSuccess: NonNullable<EditBookAnnotationMutationParams['onSuccess']>;
}

export const useEditBookAnnotation = (params: UseEditBookAnnotationParams): UseEditBookAnnotationReturn => {
  const { annotation, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<BookAnnotationPatchResponse, Error, EditAnnotationFormActionData>({
    mutationKey: ['edit-book-annotation', annotation.id],
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
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    editAnnotation: mutateAsync,
  };
};
