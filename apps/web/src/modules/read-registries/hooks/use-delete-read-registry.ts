import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { DeleteReadRegistryFormActionData } from '../types/read-registries-validations.types';
import { ReadRegistryDeleteResponse } from '@modules/api/types/read-registries-api.types';

type DeleteReadRegistryMutationResult = UseMutationResult<
  ReadRegistryDeleteResponse,
  Error,
  DeleteReadRegistryFormActionData
>;
type DeleteReadRegistryMutationParams = UseMutationOptions<
  ReadRegistryDeleteResponse,
  Error,
  DeleteReadRegistryFormActionData
>;

interface UseDeleteReadRegistryReturn {
  deleteReadRegistry: DeleteReadRegistryMutationResult['mutateAsync'];
  isLoading: DeleteReadRegistryMutationResult['isLoading'];
}

export interface UseDeleteReadRegistryParams {
  onSuccess: NonNullable<DeleteReadRegistryMutationParams['onSuccess']>;
}

export const useDeleteReadRegistry = (params: UseDeleteReadRegistryParams): UseDeleteReadRegistryReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<ReadRegistryDeleteResponse, Error, DeleteReadRegistryFormActionData>({
    mutationKey: ['delete-read-registry'],
    mutationFn: async (data) => {
      const url = new URL('/api/read-registry', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      if (!response.ok) {
        throw new Error('Could not delete read registry!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    deleteReadRegistry: mutateAsync,
    isLoading,
  };
};
