'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

import { useAverageReadingTime } from '@modules/dashboard/hooks/use-average-reading-time';
import DashboardAverageReadingTimeCard from './dashboard-average-reading-time-card';

const DashboardAverageReadingTime: React.FC = () => {
  const { data, isLoading } = useAverageReadingTime();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2 h-fit">
      <h3 className="text-xl font-bold">Average Reading Time</h3>
      <p>
        Stay informed about your reading habits with insights into your average reading times. Track your progress and
        maintain motivation by comparing your daily, weekly, monthly, and semester reading patterns.
      </p>

      {isLoading && (
        <div className="flex gap-2 overflow-x-auto justify-evenly items-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={`dashboard-average-reading-time-placeholder-${i}`} className="h-36 w-full" />
          ))}
        </div>
      )}

      {!isLoading && data?.data?.averageReadingTimes && (
        <div className="flex gap-2 overflow-x-auto justify-evenly items-center">
          <DashboardAverageReadingTimeCard
            title="Daily"
            current={data.data.averageReadingTimes.daily.current}
            past={data.data.averageReadingTimes.daily.past}
            renderPast={(difference, sign) => `${sign}${difference} than last day`}
          />
          <DashboardAverageReadingTimeCard
            title="Weekly"
            current={data.data.averageReadingTimes.weekly.current}
            past={data.data.averageReadingTimes.weekly.past}
            renderPast={(difference, sign) => `${sign}${difference} than last week`}
          />
          <DashboardAverageReadingTimeCard
            title="Monhtly"
            current={data.data.averageReadingTimes.monthly.current}
            past={data.data.averageReadingTimes.monthly.past}
            renderPast={(difference, sign) => `${sign}${difference} than last month`}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardAverageReadingTime;
