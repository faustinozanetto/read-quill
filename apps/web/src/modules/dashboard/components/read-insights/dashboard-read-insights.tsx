'use client';

import React, { Suspense } from 'react';
import DashboardReadInsightsHeader from './header/dashboard-read-insights-header';
import DashboardReadInsightTrends from './read-trends/dashboard-read-insights-trends';
import DashboardReadTimeDistribution from './read-time-distribution/dashboard-read-time-distribution';

const DashboardReadInsights: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
        <DashboardReadInsightsHeader />
        <p>
          Uncover deep insights into your reading habits with the Read Insights section. Gain a bird&apos;s-eye view of
          your daily, weekly, and monthly reading trends.
        </p>
      </div>

      <div className="grid gap-2 xl:grid-cols-2">
        <Suspense>
          <DashboardReadInsightTrends />
        </Suspense>
        <DashboardReadTimeDistribution />
      </div>
    </div>
  );
};

export default DashboardReadInsights;
