import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { EditReadRegistryFormActionData } from '../types/read-registries-validations.types';
import { ReadRegistryPatchResponse } from '@modules/api/types/read-registries-api.types';

type EditReadRegistryMutationResult = UseMutationResult<
  ReadRegistryPatchResponse,
  Error,
  EditReadRegistryFormActionData
>;
type EditReadRegistryMutationParams = UseMutationOptions<
  ReadRegistryPatchResponse,
  Error,
  EditReadRegistryFormActionData
>;

interface UseEditReadRegistryReturn {
  editReadRegistry: EditReadRegistryMutationResult['mutateAsync'];
  isLoading: EditReadRegistryMutationResult['isLoading'];
}

export interface UseEditReadRegistryParams {
  onSuccess: NonNullable<EditReadRegistryMutationParams['onSuccess']>;
}

export const useEditReadRegistry = (params: UseEditReadRegistryParams): UseEditReadRegistryReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<ReadRegistryPatchResponse, Error, EditReadRegistryFormActionData>({
    mutationKey: ['edit-read-registry'],
    mutationFn: async (data) => {
      const url = new URL('/api/read-registry', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      if (!response.ok) {
        throw new Error('Could not edit read registry!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    editReadRegistry: mutateAsync,
    isLoading,
  };
};
