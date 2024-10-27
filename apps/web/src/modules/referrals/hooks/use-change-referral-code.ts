import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { ReferralsChangePostResponse } from '@modules/api/types/referrals-api.types';
import { ChangeReferralCodeFormActionData } from '../types/referrals-validations.types';

type ChangeReferralCodeMutationResult = UseMutationResult<
  ReferralsChangePostResponse,
  Error,
  ChangeReferralCodeFormActionData
>;
type ChangeReferralCodeMutationParams = UseMutationOptions<
  ReferralsChangePostResponse,
  Error,
  ChangeReferralCodeFormActionData
>;

interface UseChangeReferralCodeReturn {
  changeReferralCode: ChangeReferralCodeMutationResult['mutateAsync'];
  isPending: ChangeReferralCodeMutationResult['isPending'];
}

export interface UseChangeReferralCodeParams {
  onSuccess: NonNullable<ChangeReferralCodeMutationParams['onSuccess']>;
}

export const useChangeReferralCode = (params: UseChangeReferralCodeParams): UseChangeReferralCodeReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<ReferralsChangePostResponse, Error, ChangeReferralCodeFormActionData>({
    mutationKey: ['change-referral-code'],
    mutationFn: async (data) => {
      const url = new URL('/api/referrals/change', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as ReferralsChangePostResponse;

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
    changeReferralCode: mutateAsync,
    isPending,
  };
};
