import { Image } from '@read-quill/database';

export const DASHBOARD_READ_TARGETS = ['daily', 'weekly', 'monthly'] as const;
export type DashboardReadTargetsType = (typeof DASHBOARD_READ_TARGETS)[number];

export const dashboardReadInsightsReadTrendsIntervals = ['daily', 'weekly', 'monthly'] as const;
export type DashboardReadInsightsReadTrendsIntervalType = (typeof dashboardReadInsightsReadTrendsIntervals)[number];

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
