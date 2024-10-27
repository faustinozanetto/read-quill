import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ReferralsGetResponse } from '@modules/api/types/referrals-api.types';

type UseReferralCodesReturn = Pick<
  UseQueryResult<ReferralsGetResponse | undefined>,
  'data' | 'isLoading' | 'isFetching'
>;

interface UseReferralCodesParams {
  code?: string;
}

export const useReferralCodes = (params: UseReferralCodesParams): UseReferralCodesReturn => {
  const { code } = params;
  const { toast } = useToast();

  const { data, status, isLoading, isFetching } = useQuery<ReferralsGetResponse | undefined>({
    queryKey: ['referral-code', code],
    enabled: !!code,
    queryFn: async () => {
      try {
        if (!code) return;

        const url = new URL('/api/referrals', __URL__);
        url.searchParams.set('code', code);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as ReferralsGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch referral codes';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading, isFetching };
};
