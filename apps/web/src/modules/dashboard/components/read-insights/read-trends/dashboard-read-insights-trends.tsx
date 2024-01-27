'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useReadInsightsTrends } from '@modules/dashboard/hooks/use-read-insights-trends';
import DashboardReadInsightTrendsIntervalSelect from './dashboard-read-insights-trends-interval-select';
import DashboardReadInsightTrendsChart from './dashboard-read-insights-trends-chart';

const DashboardReadInsightTrends: React.FC = () => {
  const { data, isLoading, isFetching, interval, setInterval } = useReadInsightsTrends();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">Read Trends</h3>
          <DashboardReadInsightTrendsIntervalSelect interval={interval} setInterval={setInterval} />
        </div>
        <p>
          Dive into your reading habits with Read Trends, showcasing detailed bar charts for daily, weekly, and monthly
          page consumption. Track your progress, set goals, and discover patterns to make the most of your reading
          journey.
        </p>
      </div>

      {isFetching || isLoading ? <Skeleton className="h-48 w-full" /> : null}

      {!(isFetching || isLoading) && data.trends.length > 0 ? (
        <DashboardReadInsightTrendsChart interval={interval} trends={data.trends} />
      ) : null}

      {!(isFetching || isLoading) && data.trends.length === 0 ? <p>Not enough data to display read trends!</p> : null}
    </div>
  );
};

export default DashboardReadInsightTrends;
