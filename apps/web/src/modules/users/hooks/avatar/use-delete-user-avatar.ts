import { UserAvatarDeleteResponse } from '@modules/api/types/users-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type DeleteUserAvatarMutationResult = UseMutationResult<UserAvatarDeleteResponse, Error, {}>;
type DeleteUserAvatarMutationParams = UseMutationOptions<UserAvatarDeleteResponse, Error, {}>;

interface UseDeleteUserAvatarReturn {
  deleteAvatar: DeleteUserAvatarMutationResult['mutateAsync'];
  isPending: DeleteUserAvatarMutationResult['isPending'];
}

export interface UseDeleteUserAvatarParams {
  onSuccess?: DeleteUserAvatarMutationParams['onSuccess'];
}

export const useDeleteUserAvatar = (params: UseDeleteUserAvatarParams = {}): UseDeleteUserAvatarReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<UserAvatarDeleteResponse, Error, {}>({
    mutationKey: ['complete-profile'],
    mutationFn: async () => {
      const url = new URL('/api/user/avatar', __URL__);

      const response = await fetch(url, { method: 'DELETE' });
      const responseData = (await response.json()) as UserAvatarDeleteResponse;

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

  return { isPending, deleteAvatar: mutateAsync };
};
