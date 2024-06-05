'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

import DashboardReadTimeDistributionChart from './dashboard-read-time-distribution-chart';
import { useReadsTimeDistribution } from '@modules/dashboard/hooks/use-read-time-distribution';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';
import { cn } from '@read-quill/design-system';

interface DashboardReadTimeDistributionProps {
  className?: string;
}

const DashboardReadTimeDistribution: React.FC<DashboardReadTimeDistributionProps> = (props) => {
  const { className } = props;

  const { data, isLoading } = useReadsTimeDistribution();

  return (
    <div className={cn('rounded-lg border p-4 shadow flex flex-col gap-2 h-fit', className)}>
      <h3 className="text-xl font-bold">Read Time Distribution</h3>
      <p>
        Explore your reading patterns with the Read Time Distribution graph, revealing the accumulated pages read
        throughout the day. Uncover peak reading hours and gain insights to enhance your daily reading routine.
      </p>

      {isLoading ? <Skeleton className="h-48 w-full" /> : null}

      {!isLoading && data?.data?.timeDistribution.length ? (
        <DashboardReadTimeDistributionChart timeDistribution={data.data.timeDistribution} />
      ) : null}

      {!isLoading && !data?.data?.timeDistribution.length ? (
        <DashboardNoDataMessage>
          <p>Log your reading sessions to discover how your time is distributed.</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardReadTimeDistribution;
