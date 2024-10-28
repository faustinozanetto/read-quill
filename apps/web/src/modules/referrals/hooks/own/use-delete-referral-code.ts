import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { ReferralsDeleteResponse } from '@modules/api/types/referrals-api.types';

type DeleteReferralCodeMutationResult = UseMutationResult<ReferralsDeleteResponse, Error, unknown>;
type DeleteReferralCodeMutationParams = UseMutationOptions<ReferralsDeleteResponse, Error, unknown>;

interface UseDeleteReferralCodeReturn {
  deleteReferralCode: DeleteReferralCodeMutationResult['mutateAsync'];
  isPending: DeleteReferralCodeMutationResult['isPending'];
}

export interface UseDeleteReferralCodeParams {
  onSuccess: NonNullable<DeleteReferralCodeMutationParams['onSuccess']>;
}

export const useDeleteReferralCode = (params: UseDeleteReferralCodeParams): UseDeleteReferralCodeReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<ReferralsDeleteResponse, Error, unknown>({
    mutationKey: ['delete-referral-code'],
    mutationFn: async () => {
      const url = new URL('/api/referrals', __URL__);

      const response = await fetch(url, { method: 'DELETE' });
      const responseData = (await response.json()) as ReferralsDeleteResponse;

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
    deleteReferralCode: mutateAsync,
    isPending,
  };
};
