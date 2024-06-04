import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { CommunityTopUsersGetResponse } from '@modules/api/types/community-api.types';

export interface UseCommunityTopUsersReturn
  extends Pick<UseQueryResult<CommunityTopUsersGetResponse>, 'data' | 'isLoading'> {}

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

  const { data, isLoading, isFetching } = useQuery<CommunityTopUsersGetResponse>({
    queryKey: ['community-top-users'],
    queryFn: async () => {
      try {
        const url = buildUrl(take);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch community top users!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch community top users!' });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
