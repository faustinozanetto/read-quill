import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { UserDeleteResponse } from '@modules/api/types/users-api.types';
import { DeleteAccountFormActionData } from '../types/user-settings-validations.types';

type DeleteUserAccountMutationResult = UseMutationResult<UserDeleteResponse, Error, DeleteAccountFormActionData>;
type DeleteUserAccountMutationParams = UseMutationOptions<UserDeleteResponse, Error, DeleteAccountFormActionData>;

interface UseDeletUserAccounteReturn {
  deleteUserAccount: DeleteUserAccountMutationResult['mutateAsync'];
}

interface UseDeleteUserAccountParams {
  onSuccess: NonNullable<DeleteUserAccountMutationParams['onSuccess']>;
}

export const useDeleteUserAccount = (params: UseDeleteUserAccountParams): UseDeletUserAccounteReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<UserDeleteResponse, Error, DeleteAccountFormActionData>({
    mutationKey: ['user-delete'],
    mutationFn: async (data) => {
      const url = new URL('/api/user', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      const responseData = (await response.json()) as UserDeleteResponse;

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
    deleteUserAccount: mutateAsync,
  };
};
