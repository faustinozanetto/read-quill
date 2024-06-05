import type {
  AchievementWithProgress,
  AchievementWithUserAchievement,
} from '@modules/achievements/types/achievements.types';
import { BaseApiResponse } from './api.types';

export interface AchievementsUnLockedGetResponse extends BaseApiResponse {
  data?: { unLockedAchievements: AchievementWithUserAchievement[] };
}

export interface AchievementsLockedGetResponse extends BaseApiResponse {
  data?: {
    lockedAchievements: AchievementWithProgress[];
  };
}
