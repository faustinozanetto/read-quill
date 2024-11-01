import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { EditReferralCodeFormActionData } from '../../types/referrals-validations.types';
import { ReferralsPatchResponse } from '@modules/api/types/referrals-api.types';

type EditReferralCodeMutationResult = UseMutationResult<ReferralsPatchResponse, Error, EditReferralCodeFormActionData>;
type EditReferralCodeMutationParams = UseMutationOptions<ReferralsPatchResponse, Error, EditReferralCodeFormActionData>;

interface UseEditReferralCodeReturn {
  editReferralCode: EditReferralCodeMutationResult['mutateAsync'];
  isPending: EditReferralCodeMutationResult['isPending'];
}

export interface UseEditReferralCodeParams {
  onSuccess: NonNullable<EditReferralCodeMutationParams['onSuccess']>;
}

export const useEditReferralCode = (params: UseEditReferralCodeParams): UseEditReferralCodeReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<ReferralsPatchResponse, Error, EditReferralCodeFormActionData>({
    mutationKey: ['edit-referral-code'],
    mutationFn: async (data) => {
      const url = new URL('/api/referrals', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      const responseData = (await response.json()) as ReferralsPatchResponse;

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
    editReferralCode: mutateAsync,
    isPending,
  };
};
