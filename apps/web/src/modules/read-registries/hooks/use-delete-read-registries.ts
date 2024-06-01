import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { DeleteReadRegistriesFormActionData } from '../types/read-registries-validations.types';
import { ReadRegistryDeleteResponse } from '@modules/api/types/read-registries-api.types';

type DeleteReadRegistriesMutationResult = UseMutationResult<
  ReadRegistryDeleteResponse,
  Error,
  DeleteReadRegistriesFormActionData
>;
type DeleteReadRegistriesMutationParams = UseMutationOptions<
  ReadRegistryDeleteResponse,
  Error,
  DeleteReadRegistriesFormActionData
>;

interface UseDeleteReadRegistriesReturn {
  deleteReadRegistries: DeleteReadRegistriesMutationResult['mutateAsync'];
  isLoading: DeleteReadRegistriesMutationResult['isLoading'];
}

export interface UseDeleteReadRegistriesParams {
  onSuccess: NonNullable<DeleteReadRegistriesMutationParams['onSuccess']>;
}

export const useDeleteReadRegistries = (params: UseDeleteReadRegistriesParams): UseDeleteReadRegistriesReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<ReadRegistryDeleteResponse, Error, DeleteReadRegistriesFormActionData>(
    {
      mutationKey: ['delete-read-registries'],
      mutationFn: async (data) => {
        const url = new URL('/api/read-registry/multiple', __URL__);
        const body = JSON.stringify({
          ...data,
        });

        const response = await fetch(url, { method: 'DELETE', body });
        if (!response.ok) {
          throw new Error('Could not delete read registries!');
        }

        return response.json();
      },
      onSuccess,
      onError(error) {
        toast({ variant: 'error', content: error.message });
      },
    }
  );

  return {
    deleteReadRegistries: mutateAsync,
    isLoading,
  };
};
