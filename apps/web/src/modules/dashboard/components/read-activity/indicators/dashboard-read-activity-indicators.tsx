import React from 'react';
import { useReadActivityGraph } from '@modules/dashboard/hooks/read-activity/use-read-activity-graph';
import DashboardReadActivityIndicator from './dashboard-read-activity-indicator';

const DashboardReadActivityIndicators: React.FC = () => {
  const { ACTIVITY_THRESHOLDS } = useReadActivityGraph();

  return (
    <div className="w-max ml-auto items-center justify-end flex gap-2 text-xs">
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
  );
};

export default DashboardReadActivityIndicators;
