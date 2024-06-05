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
  isPending: EditReadRegistryMutationResult['isPending'];
}

export interface UseEditReadRegistryParams {
  onSuccess: NonNullable<EditReadRegistryMutationParams['onSuccess']>;
}

export const useEditReadRegistry = (params: UseEditReadRegistryParams): UseEditReadRegistryReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<ReadRegistryPatchResponse, Error, EditReadRegistryFormActionData>({
    mutationKey: ['edit-read-registry'],
    mutationFn: async (data) => {
      const url = new URL('/api/read-registry', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      const responseData = (await response.json()) as ReadRegistryPatchResponse;

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
    editReadRegistry: mutateAsync,
    isPending,
  };
};
