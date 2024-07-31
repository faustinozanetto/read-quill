import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { AchievementsPinnedGetResponse } from '@modules/api/types/achievements-api.types';

export type UsePinnedAchievementsReturn = Pick<UseQueryResult<AchievementsPinnedGetResponse>, 'data' | 'isLoading'>;

interface UsePinnedAchievementsParams {
  userId?: string;
}

export const usePinnedAchievements = (params: UsePinnedAchievementsParams): UsePinnedAchievementsReturn => {
  const { userId } = params;
  const { toast } = useToast();

  const { data, status } = useQuery<AchievementsPinnedGetResponse>({
    queryKey: ['achivements-pinned', userId],
    enabled: !!userId,
    queryFn: async () => {
      try {
        if (!userId) return;

        const url = new URL('/api/achievements/pinned', __URL__);
        url.searchParams.set('userId', userId);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch user pinned achievements!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch pinned achievements!' });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
