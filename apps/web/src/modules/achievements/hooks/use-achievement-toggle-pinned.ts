import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { AchievementsTogglePinnedPostResponse } from '@modules/api/types/achievements-api.types';
import { TogglePinnedAchievementApiActionData } from '../types/achievement-validations.types';

type AchievementTogglePinnedMutationResult = UseMutationResult<
  AchievementsTogglePinnedPostResponse,
  Error,
  TogglePinnedAchievementApiActionData
>;
type AchievementTogglePinnedMutationParams = UseMutationOptions<
  AchievementsTogglePinnedPostResponse,
  Error,
  TogglePinnedAchievementApiActionData
>;

interface UseAchievementTogglePinnedReturn {
  achievementTogglePinned: AchievementTogglePinnedMutationResult['mutateAsync'];
  isPending: AchievementTogglePinnedMutationResult['isPending'];
}

export interface UseAchievementTogglePinnedParams {
  onSuccess: NonNullable<AchievementTogglePinnedMutationParams['onSuccess']>;
}

export const useAchievementTogglePinned = (
  params: UseAchievementTogglePinnedParams
): UseAchievementTogglePinnedReturn => {
  const { onSuccess } = params;
  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<
    AchievementsTogglePinnedPostResponse,
    Error,
    TogglePinnedAchievementApiActionData
  >({
    mutationKey: ['achivement-toggle-pinned'],
    mutationFn: async (data) => {
      const url = new URL('/api/achievements/toggle-pinned', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as AchievementsTogglePinnedPostResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      return responseData;
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return { achievementTogglePinned: mutateAsync, isPending };
};
