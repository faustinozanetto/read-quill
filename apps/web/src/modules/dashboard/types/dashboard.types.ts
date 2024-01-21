export const dashboardReadTargets = ['daily', 'weekly', 'monthly'] as const;
export type DashboardReadTargetsType = (typeof dashboardReadTargets)[number];

export type DashboardBooksProgress = Record<string, { name: string; cover: string; progress: number }>;
