'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useReadsTrends } from '@modules/dashboard/hooks/use-read-trends';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';
import DashboardReadTrendsChart from './dashboard-read-trends-chart';
import DashboardReadTrendsDailyRangeSelect from './dashboard-read-trends-daily-range-select';
import DashboardReadTrendsIntervalSelect from './dashboard-read-trends-interval-select';
import { cn } from '@read-quill/design-system';

interface DashboardReadTrendsProps {
  className?: string;
}

const DashboardReadTrends: React.FC<DashboardReadTrendsProps> = (props) => {
  const { className } = props;

  const { data, filteredData, isLoading, isFetching, interval, setInterval, dailyRange, setDailyRange } =
    useReadsTrends();

  return (
    <div className={cn('rounded-lg border p-4 shadow flex flex-col gap-2 h-fit', className)}>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Read Trends</h3>
        <p>
          Dive into your reading habits with Read Trends, showcasing detailed bar charts for daily, weekly, and monthly
          page consumption. Track your progress, set goals, and discover patterns to make the most of your reading
          journey.
        </p>
        {data.trends.length > 0 && (
          <div className="ml-auto space-x-2">
            {interval === 'daily' && (
              <DashboardReadTrendsDailyRangeSelect dailyRange={dailyRange} setDailyRange={setDailyRange} />
            )}
            <DashboardReadTrendsIntervalSelect interval={interval} setInterval={setInterval} />
          </div>
        )}
      </div>

      {isFetching || isLoading ? <Skeleton className="h-48 w-full" /> : null}

      {!(isFetching || isLoading) && filteredData.trends.length > 0 ? (
        <DashboardReadTrendsChart interval={interval} trends={filteredData.trends} />
      ) : null}

      {!(isFetching || isLoading) && data.trends.length === 0 ? (
        <DashboardNoDataMessage>
          <p>Start logging your readings to discover trends over time.</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardReadTrends;
