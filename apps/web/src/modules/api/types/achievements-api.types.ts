import type {
  AchievementWithProgress,
  UserAchievementWithAchievement,
} from '@modules/achievements/types/achievements.types';

export interface AchievementsUnLockedGetResponse {
  unLockedAchievements: UserAchievementWithAchievement[];
}

export interface AchievementsLockedGetResponse {
  lockedAchievements: AchievementWithProgress[];
}
