import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ReferralsReferredGetRespone } from '@modules/api/types/referrals-api.types';
import { useCallback, useState } from 'react';

export interface UseReferralCodeReferredReturn
  extends Pick<UseQueryResult<ReferralsReferredGetRespone | undefined>, 'data' | 'isLoading'> {
  page: number;
  setPageIndex: (index: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
}

interface UseReferralCodeReferredParams {
  code?: string | null;
  pageSize: number;
}

const buildUrl = (page: number, pageSize: number, code: string): string => {
  const url = new URL('/api/referrals/referred', __URL__);
  url.searchParams.set('pageIndex', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('code', code);

  return url.toString();
};

export const useReferralCodeReferred = (params: UseReferralCodeReferredParams): UseReferralCodeReferredReturn => {
  const { code, pageSize } = params;

  const { toast } = useToast();
  const [page, setPage] = useState(0);

  const { data, status, isPlaceholderData } = useQuery<ReferralsReferredGetRespone | undefined>({
    queryKey: ['referral-code-referred', code, page, pageSize],
    enabled: !!code,
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      try {
        if (!code) return;

        const url = buildUrl(page, pageSize, code);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as ReferralsReferredGetRespone;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch referral code referred';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  const previousPage = useCallback(() => {
    setPage((old) => Math.max(old - 1, 0));
  }, []);

  const nextPage = useCallback(() => {
    if (!data?.data) return;

    if (!isPlaceholderData && data.data.hasMore) {
      setPage((old) => old + 1);
    }
  }, [data?.data?.hasMore, isPlaceholderData]);

  const setPageIndex = useCallback(
    (index: number) => {
      if (!data?.data) return;

      if (index >= 0 && index <= data.data.pageCount) setPage(index);
    },
    [data?.data]
  );

  const getCanPreviousPage = useCallback(() => {
    return page !== 0;
  }, [page]);

  const getCanNextPage = useCallback(() => {
    if (!data?.data) return false;

    return !(isPlaceholderData || !data.data.hasMore);
  }, [data?.data, isPlaceholderData]);

  return {
    data,
    isLoading: status === 'pending',
    page,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    setPageIndex,
  };
};
