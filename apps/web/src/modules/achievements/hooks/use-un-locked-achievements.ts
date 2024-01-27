import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { AchievementsUnLockedGetResponse } from '@modules/api/types/achievements-api.types';

export interface UseUnLockedAchievementsReturn {
  data: AchievementsUnLockedGetResponse;
  isLoading: boolean;
  isFetching: boolean;
}

export const useUnLockedAchievements = (): UseUnLockedAchievementsReturn => {
  const { data, isLoading, isFetching } = useQuery<AchievementsUnLockedGetResponse>(['achivements-un-locked'], {
    initialData: { unLockedAchievements: [] },
    queryFn: async () => {
      try {
        const url = new URL('/api/achievements/un-locked', __URL__);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch user unlocked achievements!');
        }

        return response.json();
      } catch (error) {
        if (error instanceof Error) throw new Error(`Failed to fetch user unlocked achievements: ${error.message}`);
      }
    },
  });

  return { data, isLoading, isFetching };
};
