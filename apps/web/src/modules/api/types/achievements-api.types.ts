import type {
  AchievementWithProgress,
  AchievementWithUserAchievement,
} from '@modules/achievements/types/achievements.types';

export interface AchievementsUnLockedGetResponse {
  unLockedAchievements: AchievementWithUserAchievement[];
}

export interface AchievementsLockedGetResponse {
  lockedAchievements: AchievementWithProgress[];
}
