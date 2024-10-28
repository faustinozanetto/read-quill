import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { ReferralsUsedDeleteResponse } from '@modules/api/types/referrals-api.types';

type RemoveReferralCodeMutationResult = UseMutationResult<ReferralsUsedDeleteResponse, Error, unknown>;
type RemoveReferralCodeMutationParams = UseMutationOptions<ReferralsUsedDeleteResponse, Error, unknown>;

interface UseRemoveReferralCodeReturn {
  removeReferralCode: RemoveReferralCodeMutationResult['mutateAsync'];
  isPending: RemoveReferralCodeMutationResult['isPending'];
}

export interface UseRemoveReferralCodeParams {
  onSuccess: NonNullable<RemoveReferralCodeMutationParams['onSuccess']>;
}

export const useRemoveReferralCode = (params: UseRemoveReferralCodeParams): UseRemoveReferralCodeReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<ReferralsUsedDeleteResponse, Error, unknown>({
    mutationKey: ['remove-referral-code'],
    mutationFn: async () => {
      const url = new URL('/api/referrals/used', __URL__);

      const response = await fetch(url, { method: 'DELETE' });
      const responseData = (await response.json()) as ReferralsUsedDeleteResponse;

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
    removeReferralCode: mutateAsync,
    isPending,
  };
};
