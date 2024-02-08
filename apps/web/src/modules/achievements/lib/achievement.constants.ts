import type { NestedKeyOf } from '@modules/filters/hooks/use-filter-data';
import type { AchievementWithProgress, AchievementWithUserAchievement } from '../types/achievements.types';

export const ACHIEVEMENT_DISPLAY_CRITERIAS: Record<string, string> = {
  pagesRead: 'Pages Read',
  booksRead: 'Books Read',
  readDaysStreak: 'Read Days Streak',
};

export const UN_LOCKED_ACHIEVEMENT_SORT_BY: Partial<Record<NestedKeyOf<AchievementWithUserAchievement>, string>> = {
  name: 'Name',
  unlockedAt: 'Unlocked At',
};

export const LOCKED_ACHIEVEMENT_SORT_BY: Partial<Record<NestedKeyOf<AchievementWithProgress>, string>> = {
  name: 'Name',
  completionPercentage: 'Completion %',
};
