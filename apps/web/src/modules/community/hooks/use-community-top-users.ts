import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { CommunityTopUsersGetResponse } from '@modules/api/types/community-api.types';

export interface UseCommunityTopUsersReturn
  extends Pick<UseQueryResult<CommunityTopUsersGetResponse | undefined>, 'data' | 'isLoading'> {}

interface UseCommunityTopUsersParams {
  take: number;
}

const buildUrl = (take: number): string => {
  const url = new URL('/api/community/top-users', __URL__);
  url.searchParams.set('take', String(take));
  return url.toString();
};

export const useCommunityTopUsers = (params: UseCommunityTopUsersParams = { take: 6 }): UseCommunityTopUsersReturn => {
  const { take } = params;

  const { toast } = useToast();

  const { data, status } = useQuery<CommunityTopUsersGetResponse | undefined>({
    queryKey: ['community-top-users'],
    queryFn: async () => {
      try {
        const url = buildUrl(take);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as CommunityTopUsersGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch community top users!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
