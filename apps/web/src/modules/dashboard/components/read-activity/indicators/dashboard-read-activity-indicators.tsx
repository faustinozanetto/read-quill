import React from 'react';
import { useReadActivityGraph } from '@modules/dashboard/hooks/read-activity/use-read-activity-graph';
import DashboardReadActivityIndicator from './dashboard-read-activity-indicator';

const DashboardReadActivityIndicators: React.FC = () => {
  const { ACTIVITY_THRESHOLDS } = useReadActivityGraph();

  return (
    <div className="w-full justify-between flex text-xs">
      <div className="flex gap-2 items-center">
        <span>Today</span>
        <div className="h-[14px] w-[14px] rounded-sm bg-secondary" />
      </div>
      <div className="flex gap-2 items-center">
        <span>Less</span>
        {ACTIVITY_THRESHOLDS.map((threshold, i) => {
          const thresholdLevel = ACTIVITY_THRESHOLDS.length - i;
          return (
            <DashboardReadActivityIndicator
              key={`activity-threshold-indicator-${threshold}`}
              thresholdLevel={thresholdLevel}
            />
          );
        })}
        <span>More</span>
      </div>
    </div>
  );
};

export default DashboardReadActivityIndicators;
