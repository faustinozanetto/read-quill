import { AnnotationDeleteResponse } from '@modules/api/types/annotations-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { DeleteAnnotationApiActionData } from '../types/annotation-validations.types';

type DeleteAnnotationMutationResult = UseMutationResult<AnnotationDeleteResponse, Error, DeleteAnnotationApiActionData>;
type DeleteAnnotationMutationParams = UseMutationOptions<
  AnnotationDeleteResponse,
  Error,
  DeleteAnnotationApiActionData
>;

interface UseDeleteAnnotationReturn {
  deleteAnnotation: DeleteAnnotationMutationResult['mutateAsync'];
  isLoading: DeleteAnnotationMutationResult['isLoading'];
}

export interface UseDeleteAnnotationParams {
  onSuccess: NonNullable<DeleteAnnotationMutationParams['onSuccess']>;
}

export const useDeleteAnnotation = (params: UseDeleteAnnotationParams): UseDeleteAnnotationReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<AnnotationDeleteResponse, Error, DeleteAnnotationApiActionData>({
    mutationKey: ['delete-annotation'],
    mutationFn: async (data) => {
      const url = new URL('/api/annotation', __URL__);
      const body = JSON.stringify({
        ...data,
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
    isLoading,
  };
};
