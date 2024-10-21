import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { CreateReferralCodeFormActionData } from '../types/referrals-validations.types';
import { ReferralsCreatePostResponse } from '@modules/api/types/referrals-api.types';

type CreateReferralCodeMutationResult = UseMutationResult<
  ReferralsCreatePostResponse,
  Error,
  CreateReferralCodeFormActionData
>;
type CreateReferralCodeMutationParams = UseMutationOptions<
  ReferralsCreatePostResponse,
  Error,
  CreateReferralCodeFormActionData
>;

interface UseCreateReferralCodeReturn {
  createReferralCode: CreateReferralCodeMutationResult['mutateAsync'];
  isPending: CreateReferralCodeMutationResult['isPending'];
}

export interface UseCreateReferralCodeParams {
  onSuccess: NonNullable<CreateReferralCodeMutationParams['onSuccess']>;
}

export const useCreateReferralCode = (params: UseCreateReferralCodeParams): UseCreateReferralCodeReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<ReferralsCreatePostResponse, Error, CreateReferralCodeFormActionData>({
    mutationKey: ['create-referral-code'],
    mutationFn: async (data) => {
      const url = new URL('/api/referrals/create', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as ReferralsCreatePostResponse;

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
    createReferralCode: mutateAsync,
    isPending,
  };
};