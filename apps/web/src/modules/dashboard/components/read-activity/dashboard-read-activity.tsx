import React from 'react';
import DashboardReadActivityHeader from './header/dashboard-read-activity-header';
import DashboardReadActivityGraph from './dashboard-read-activity-graph';
import DashboardReadActivityIndicators from './dashboard-read-activity-indicators';

const ACTIVITY_THRESHOLDS = [0, 5, 10, 20, 50, 100];

export const mapActivityToLevel = (activityValue: number): number => {
  for (let i = ACTIVITY_THRESHOLDS.length - 1; i >= 0; i--) {
    if (activityValue >= ACTIVITY_THRESHOLDS[i]) {
      return i;
    }
  }

  return 0;
};

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
