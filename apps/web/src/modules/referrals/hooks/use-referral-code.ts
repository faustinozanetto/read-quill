import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ReferralsGetResponse } from '@modules/api/types/referrals-api.types';

type UseReferralCodeReturn = Pick<UseQueryResult<ReferralsGetResponse | undefined>, 'data' | 'isLoading'>;

interface UseReferralCodeParams {
  userId?: string;
}

export const useReferralCode = (params: UseReferralCodeParams): UseReferralCodeReturn => {
  const { userId } = params;
  const { toast } = useToast();

  const { data, status } = useQuery<ReferralsGetResponse | undefined>({
    queryKey: ['referral-code', userId],
    enabled: !!userId,
    queryFn: async () => {
      try {
        if (!userId) return;

        const url = new URL('/api/referrals', __URL__);
        url.searchParams.set('userId', userId);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as ReferralsGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch referral code';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
