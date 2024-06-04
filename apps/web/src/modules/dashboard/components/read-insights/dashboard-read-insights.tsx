import React from 'react';
import DashboardReadInsightTrends from './read-trends/dashboard-read-insights-trends';
import DashboardReadTimeDistribution from './read-time-distribution/dashboard-read-time-distribution';

const DashboardReadInsights: React.FC = () => {
  return (
    <div className="grid gap-2 xl:grid-cols-2">
      <DashboardReadInsightTrends />
      <DashboardReadTimeDistribution />
    </div>
  );
};

export default DashboardReadInsights;
