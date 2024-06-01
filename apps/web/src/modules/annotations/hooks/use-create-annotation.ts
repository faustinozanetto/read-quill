import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { CreateAnnotationApiActionData } from '../types/annotation-validations.types';
import { AnnotationPostResponse } from '@modules/api/types/annotations-api.types';

type CreateAnnotationMutationResult = UseMutationResult<AnnotationPostResponse, Error, CreateAnnotationApiActionData>;
type CreateAnnotationMutationParams = UseMutationOptions<AnnotationPostResponse, Error, CreateAnnotationApiActionData>;

interface UseCreateAnnotationReturn {
  createAnnotation: CreateAnnotationMutationResult['mutateAsync'];
}

export interface UseCreateAnnotationParams {
  onSuccess: NonNullable<CreateAnnotationMutationParams['onSuccess']>;
}

export const useCreateAnnotation = (params: UseCreateAnnotationParams): UseCreateAnnotationReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<AnnotationPostResponse, Error, CreateAnnotationApiActionData>({
    mutationKey: ['create-annotation'],
    mutationFn: async (data) => {
      const url = new URL('/api/annotation', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not create annotation!');
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
