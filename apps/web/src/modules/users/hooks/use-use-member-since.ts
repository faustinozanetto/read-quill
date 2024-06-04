import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { UserMemberSinceGetResponse } from '@modules/api/types/users-api.types';

type UseUserMemberSinceReturn = Pick<UseQueryResult<UserMemberSinceGetResponse>, 'data' | 'isLoading'>;

interface UseUserMemberSinceParams {
  userId?: string;
}

export const useUserMemberSince = (params: UseUserMemberSinceParams): UseUserMemberSinceReturn => {
  const { userId } = params;
  const { toast } = useToast();

  const { data, isFetching, isLoading } = useQuery<UserMemberSinceGetResponse>(['user-member-since', userId], {
    enabled: !!userId,
    queryFn: async () => {
      try {
        if (!userId) return;
        const url = new URL('/api/user/member-since', __URL__);
        url.searchParams.set('userId', userId);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user member since');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch user member since!' });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
