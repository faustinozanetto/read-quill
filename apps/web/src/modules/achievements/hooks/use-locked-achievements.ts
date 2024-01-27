import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { AchievementsLockedGetResponse } from '@modules/api/types/achievements-api.types';

export interface UseLockedAchievementsReturn {
  data: AchievementsLockedGetResponse;
  isLoading: boolean;
  isFetching: boolean;
}

export const useLockedAchievements = (): UseLockedAchievementsReturn => {
  const { data, isLoading, isFetching } = useQuery<AchievementsLockedGetResponse>(['achivements-locked'], {
    initialData: { lockedAchievements: [] },
    queryFn: async () => {
      try {
        const url = new URL('/api/achievements/locked', __URL__);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch user locked achievements!');
        }

        return response.json();
      } catch (error) {
        if (error instanceof Error) throw new Error(`Failed to fetch user locked achievements: ${error.message}`);
      }
    },
  });

  return { data, isLoading, isFetching };
};
