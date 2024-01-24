import React from 'react';
import DashboardReadActivityHeader from './header/dashboard-read-activity-header';
import DashboardReadActivityGraph from './graph/dashboard-read-activity-graph';
import DashboardReadActivityIndicators from './indicators/dashboard-read-activity-indicators';

const DashboardReadActivity: React.FC = () => {
  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2 overflow-hidden">
      <DashboardReadActivityHeader />
      <p>
        Explore your reading journey visually with the Read Activity Graph. Each square represents a day, allowing you
        to track your daily reading habits. Color-coded levels provide insights into your reading intensity, making it
        easy to see patterns over time.
      </p>

      <div className="flex flex-col gap-2">
        <DashboardReadActivityGraph />
        <DashboardReadActivityIndicators />
      </div>
    </div>
  );
};

export default DashboardReadActivity;
