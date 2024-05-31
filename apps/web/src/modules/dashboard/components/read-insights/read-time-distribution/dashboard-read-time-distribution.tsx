'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useReadInsightsTimeDistribution } from '@modules/dashboard/hooks/use-read-insights-time-distribution';
import DashboardNoDataMessage from '../../common/dashboard-no-data-message';
import DashboardReadTimeDistributionChart from './dashboard-read-time-distribution-chart';

const DashboardReadTimeDistribution: React.FC = () => {
  const { data, isFetching, isLoading } = useReadInsightsTimeDistribution();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2 h-fit">
      <h3 className="text-xl font-bold">Read Time Distribution</h3>
      <p>
        Explore your reading patterns with the Read Time Distribution graph, revealing the accumulated pages read
        throughout the day. Uncover peak reading hours and gain insights to enhance your daily reading routine.
      </p>

      {isFetching || isLoading ? <Skeleton className="h-48 w-full" /> : null}

      {!(isFetching || isLoading) && data.timeDistribution.length > 0 ? (
        <DashboardReadTimeDistributionChart timeDistribution={data.timeDistribution} />
      ) : null}

      {!(isFetching || isLoading) && data.timeDistribution.length === 0 ? (
        <DashboardNoDataMessage>
          <p>Log your reading sessions to discover how your time is distributed.</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardReadTimeDistribution;
