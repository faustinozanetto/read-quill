import { Image, ReadRegistry, ReadTargets } from '@read-quill/database';

export const DASHBOARD_READ_TARGETS = ['daily', 'weekly', 'monthly'] as const;
export type DashboardReadTargetsType = (typeof DASHBOARD_READ_TARGETS)[number];

export const dashboardReadTrendsIntervals = ['daily', 'weekly', 'monthly'] as const;
export type DashboardReadTrendsIntervalType = (typeof dashboardReadTrendsIntervals)[number];

export const dashboardAverageReadingTimeIntervals = ['daily', 'weekly', 'monthly'] as const;
export type DashboardAverageReadingTimeIntervalType = (typeof dashboardAverageReadingTimeIntervals)[number];

export interface DashboardReadActivityEntry {
  level: number;
  date: string;
}

export interface BookProgressEntry {
  id: string;
  progress: number;
  cover: Image;
  name: string;
  completed: boolean;
}

export interface DashboardBookRatingEntry {
  rating: number;
  count: number;
}

export interface DashboardBookName {
  id: string;
  name: string;
}

export type DashboardReadActivty = Record<string, number>;

export interface DashboardReadTargets {
  targetReadTargets: Pick<ReadTargets, 'daily' | 'weekly' | 'monthly'>;
  readTargets: Pick<ReadTargets, 'daily' | 'weekly' | 'monthly'>;
}

export interface DashboardReadTrendEntry {
  date: string;
  registries: ReadRegistry[];
}
