export const dashboardReadTargets = ['daily', 'weekly', 'monthly'] as const;
export type DashboardReadTargetsType = typeof dashboardReadTargets[number];
