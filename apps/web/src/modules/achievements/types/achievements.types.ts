import type { Achievement, UserAchievement } from '@read-quill/database';

export interface UserAchievementWithAchievement extends UserAchievement {
  achievement: Achievement;
}
