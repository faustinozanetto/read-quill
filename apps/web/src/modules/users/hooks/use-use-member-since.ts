import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { UserMemberSinceGetResponse } from '@modules/api/types/users-api.types';

type UseUserMemberSinceReturn = Pick<UseQueryResult<UserMemberSinceGetResponse | undefined>, 'data' | 'isLoading'>;

interface UseUserMemberSinceParams {
  userId?: string;
}

export const useUserMemberSince = (params: UseUserMemberSinceParams): UseUserMemberSinceReturn => {
  const { userId } = params;
  const { toast } = useToast();

  const { data, status } = useQuery<UserMemberSinceGetResponse | undefined>({
    queryKey: ['user-member-since', userId],
    enabled: !!userId,
    queryFn: async () => {
      try {
        if (!userId) return;

        const url = new URL('/api/user/member-since', __URL__);
        url.searchParams.set('userId', userId);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as UserMemberSinceGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch user member since!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
