import { UserCompleteProfilePostResponse } from '@modules/api/types/users-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { UserCompleteProfileFormActionData } from '@modules/users/types/user-validations.types';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type CompleteProfileMutationResult = UseMutationResult<
  UserCompleteProfilePostResponse,
  Error,
  UserCompleteProfileFormActionData
>;
type CompleteProfileMutationParams = UseMutationOptions<
  UserCompleteProfilePostResponse,
  Error,
  UserCompleteProfileFormActionData
>;

interface UseCompleteProfileReturn {
  completeProfile: CompleteProfileMutationResult['mutateAsync'];
  isPending: CompleteProfileMutationResult['isPending'];
}

export interface UseCompleteProfileParams {
  onSuccess: NonNullable<CompleteProfileMutationParams['onSuccess']>;
}

export const useCompleteProfile = (params: UseCompleteProfileParams): UseCompleteProfileReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<
    UserCompleteProfilePostResponse,
    Error,
    UserCompleteProfileFormActionData
  >({
    mutationKey: ['complete-profile'],
    mutationFn: async (data) => {
      const url = new URL('/api/user/complete-profile', __URL__);
      const body = JSON.stringify({
        name: data.name,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as UserCompleteProfilePostResponse;

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

  return { isPending, completeProfile: mutateAsync };
};
