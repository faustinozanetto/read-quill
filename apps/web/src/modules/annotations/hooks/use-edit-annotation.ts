import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { EditAnnotationApiActionData } from '../types/annotation-validations.types';
import { AnnotationPatchResponse } from '@modules/api/types/annotations-api.types';

type EditAnnotationMutationResult = UseMutationResult<AnnotationPatchResponse, Error, EditAnnotationApiActionData>;
type EditAnnotationMutationParams = UseMutationOptions<AnnotationPatchResponse, Error, EditAnnotationApiActionData>;

interface UseEditAnnotationReturn {
  editAnnotation: EditAnnotationMutationResult['mutateAsync'];
}

export interface UseEditAnnotationParams {
  onSuccess: NonNullable<EditAnnotationMutationParams['onSuccess']>;
}

export const useEditAnnotation = (params: UseEditAnnotationParams): UseEditAnnotationReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<AnnotationPatchResponse, Error, EditAnnotationApiActionData>({
    mutationKey: ['edit-annotation'],
    mutationFn: async (data) => {
      const url = new URL('/api/annotation', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      if (!response.ok) {
        throw new Error('Could not edit annotation!');
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
