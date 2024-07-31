import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { AchievementsUnLockedGetResponse } from '@modules/api/types/achievements-api.types';

export type UseUnLockedAchievementsReturn = Pick<UseQueryResult<AchievementsUnLockedGetResponse>, 'data' | 'isLoading'>;

interface UseUnLockedAchievementsParams {
  userId?: string;
}

export const useUnLockedAchievements = (params: UseUnLockedAchievementsParams): UseUnLockedAchievementsReturn => {
  const { userId } = params;
  const { toast } = useToast();

  const { data, status } = useQuery<AchievementsUnLockedGetResponse>({
    queryKey: ['achivements-un-locked', userId],
    enabled: !!userId,
    queryFn: async () => {
      try {
        if (!userId) return;

        const url = new URL('/api/achievements/un-locked', __URL__);
        url.searchParams.set('userId', userId);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch user unlocked achievements!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch unlocked achievements!' });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
