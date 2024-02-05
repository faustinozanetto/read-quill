import type { DefinedUseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { AchievementsLockedGetResponse } from '@modules/api/types/achievements-api.types';

export type UseLockedAchievementsReturn = Pick<
  DefinedUseQueryResult<AchievementsLockedGetResponse>,
  'data' | 'isLoading' | 'isFetching'
>;

export const useLockedAchievements = (): UseLockedAchievementsReturn => {
  const { toast } = useToast();

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
        toast({ variant: 'error', content: 'Failed to fetch locked achievements!' });
      }
    },
  });

  return { data, isLoading, isFetching };
};
