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
  isPending: DeleteReadRegistryMutationResult['isPending'];
}

export interface UseDeleteReadRegistryParams {
  onSuccess: NonNullable<DeleteReadRegistryMutationParams['onSuccess']>;
}

export const useDeleteReadRegistry = (params: UseDeleteReadRegistryParams): UseDeleteReadRegistryReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<ReadRegistryDeleteResponse, Error, DeleteReadRegistryFormActionData>({
    mutationKey: ['delete-read-registry'],
    mutationFn: async (data) => {
      const url = new URL('/api/read-registry', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      const responseData = (await response.json()) as ReadRegistryDeleteResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      return responseData;
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    deleteReadRegistry: mutateAsync,
    isPending,
  };
};
