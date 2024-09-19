import { UserAvatarUploadPostResponse } from '@modules/api/types/users-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { UserUpdateAvatarFormActionData } from '@modules/users/types/user-validations.types';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useDeleteUserAvatar } from './use-delete-user-avatar';

type UpdateUserAvatarMutationResult = UseMutationResult<
  UserAvatarUploadPostResponse,
  Error,
  UserUpdateAvatarFormActionData
>;
type UpdateUserAvatarMutationParams = UseMutationOptions<
  UserAvatarUploadPostResponse,
  Error,
  UserUpdateAvatarFormActionData
>;

interface UseUpdateUserAvatarReturn {
  updateAvatar: UpdateUserAvatarMutationResult['mutateAsync'];
  isPending: UpdateUserAvatarMutationResult['isPending'];
}

export interface UseUpdateUserAvatarParams {
  onSuccess: NonNullable<UpdateUserAvatarMutationParams['onSuccess']>;
}

export const useUpdateUserAvatar = (params: UseUpdateUserAvatarParams): UseUpdateUserAvatarReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { deleteAvatar } = useDeleteUserAvatar();

  const { mutateAsync, isPending } = useMutation<UserAvatarUploadPostResponse, Error, UserUpdateAvatarFormActionData>({
    mutationKey: ['complete-profile'],
    mutationFn: async (data) => {
      const { avatarImage } = data;

      if (!avatarImage.length) throw new Error('No avatar image provided!');

      const deleteAvatarResponse = await deleteAvatar({});
      if (!deleteAvatarResponse.data?.success) throw new Error('Failed to delete old avatar!');

      const image = avatarImage[0];
      const formData = new FormData();
      formData.append('avatarFile', image);

      const url = new URL('/api/user/avatar/upload', __URL__);
      const response = await fetch(url, { method: 'POST', body: formData });
      const responseData = (await response.json()) as UserAvatarUploadPostResponse;

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

  return { isPending, updateAvatar: mutateAsync };
};
