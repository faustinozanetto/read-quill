import type { Achievement } from '@read-quill/database';

export interface AchievementWithUserAchievement extends Achievement {
  unlockedAt: Date | null;
  isPinned: boolean;
}

export interface AchievementWithProgress extends Achievement {
  completionPercentage: number;
}
