import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { AchievementsLockedGetResponse } from '@modules/api/types/achievements-api.types';

export type UseLockedAchievementsReturn = Pick<UseQueryResult<AchievementsLockedGetResponse>, 'data' | 'isLoading'>;

export const useLockedAchievements = (): UseLockedAchievementsReturn => {
  const { toast } = useToast();

  const { data, status } = useQuery<AchievementsLockedGetResponse>({
    queryKey: ['achivements-locked'],
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

  return { data, isLoading: status === 'pending' };
};
