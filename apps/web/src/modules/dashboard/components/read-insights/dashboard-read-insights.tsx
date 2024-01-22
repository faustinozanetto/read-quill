'use client';

import React from 'react';
import DashboardReadInsightsHeader from './header/dashboard-read-insights-header';
import DashboardReadInsightTrends from './read-trends/dashboard-read-insights-trends';

const DashboardReadInsights: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
        <DashboardReadInsightsHeader />
        <p>Visualize your daily, weekly, and monthly reading goals to shape your literary adventure.</p>
      </div>

      <DashboardReadInsightTrends />
    </div>
  );
};

export default DashboardReadInsights;
