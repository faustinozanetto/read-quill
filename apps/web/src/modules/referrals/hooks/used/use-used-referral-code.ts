import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ReferralsUsedGetResponse } from '@modules/api/types/referrals-api.types';

type UseUsedReferralCodeReturn = Pick<UseQueryResult<ReferralsUsedGetResponse | undefined>, 'data' | 'isLoading'>;

interface UseUsedReferralCodeParams {
  userId?: string;
}

export const useUsedReferralCode = (params: UseUsedReferralCodeParams): UseUsedReferralCodeReturn => {
  const { userId } = params;
  const { toast } = useToast();

  const { data, status } = useQuery<ReferralsUsedGetResponse | undefined>({
    queryKey: ['used-referral-code', userId],
    enabled: !!userId,
    queryFn: async () => {
      try {
        if (!userId) return;

        const url = new URL('/api/referrals/used', __URL__);
        url.searchParams.set('userId', userId);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as ReferralsUsedGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch used referral code';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
