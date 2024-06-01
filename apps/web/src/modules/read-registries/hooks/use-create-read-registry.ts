import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { CreateReadRegistryFormActionData } from '../types/read-registries-validations.types';
import { ReadRegistryPostResponse } from '@modules/api/types/read-registries-api.types';

type CreateReadRegistryMutationResult = UseMutationResult<
  ReadRegistryPostResponse,
  Error,
  CreateReadRegistryFormActionData
>;
type CreateReadRegistryMutationParams = UseMutationOptions<
  ReadRegistryPostResponse,
  Error,
  CreateReadRegistryFormActionData
>;

interface UseCreateReadRegistryReturn {
  createReadRegistry: CreateReadRegistryMutationResult['mutateAsync'];
  isLoading: CreateReadRegistryMutationResult['isLoading'];
}

export interface UseCreateReadRegistryParams {
  onSuccess: NonNullable<CreateReadRegistryMutationParams['onSuccess']>;
}

export const useCreateReadRegistry = (params: UseCreateReadRegistryParams): UseCreateReadRegistryReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<ReadRegistryPostResponse, Error, CreateReadRegistryFormActionData>({
    mutationKey: ['create-read-registry'],
    mutationFn: async (data) => {
      const url = new URL('/api/read-registry', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not create read registry!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    createReadRegistry: mutateAsync,
    isLoading,
  };
};
