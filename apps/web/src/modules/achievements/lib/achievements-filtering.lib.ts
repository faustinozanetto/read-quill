import type { Filter, Sort } from '@modules/filters/hooks/use-filter-data';
import type { AchievementWithProgress, AchievementWithUserAchievement } from '../types/achievements.types';

export const UN_LOCKED_ACHIEVEMENTS_INITIAL_FILTERS: Filter<AchievementWithUserAchievement>[] = [
  { property: 'name', value: '', shouldEnable: (value) => value !== '' },
  { property: 'criteria', value: [], shouldEnable: (value) => (value as string[]).length > 0 },
  { property: 'unlockedAt', value: '', shouldEnable: (value) => value !== '' },
];

export const UN_LOCKED_ACHIEVEMENTS_INITIAL_SORT: Sort<AchievementWithUserAchievement> = {
  property: 'unlockedAt',
  ascending: false,
};

export const LOCKED_ACHIEVEMENTS_INITIAL_FILTERS: Filter<AchievementWithProgress>[] = [
  { property: 'name', value: '', shouldEnable: (value) => value !== '' },
  { property: 'criteria', value: [], shouldEnable: (value) => (value as string[]).length > 0 },
  { property: 'completionPercentage', value: 0, shouldEnable: (value) => (value as number) !== 0 },
];

export const LOCKED_ACHIEVEMENTS_INITIAL_SORT: Sort<AchievementWithProgress> = {
  property: 'completionPercentage',
  ascending: false,
};
