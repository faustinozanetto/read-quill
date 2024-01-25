export const dashboardReadTargets = ['daily', 'weekly', 'monthly'] as const;
export type DashboardReadTargetsType = (typeof dashboardReadTargets)[number];

export const dashboardReadInsightsReadTrendsIntervals = ['daily', 'weekly', 'monthly'] as const;
export type DashboardReadInsightsReadTrendsIntervalType = (typeof dashboardReadInsightsReadTrendsIntervals)[number];

export interface DashboardReadActivityEntry {
  level: number;
  date: string;
}
