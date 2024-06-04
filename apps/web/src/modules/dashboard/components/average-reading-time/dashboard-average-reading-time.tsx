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

      {!isLoading && data?.readingTimes && (
        <div className="flex gap-2 overflow-x-auto justify-evenly items-center">
          <DashboardAverageReadingTimeCard
            title="Daily"
            current={data.readingTimes.daily.current}
            past={data.readingTimes.daily.past}
          />
          <DashboardAverageReadingTimeCard
            title="Weekly"
            current={data.readingTimes.weekly.current}
            past={data.readingTimes.weekly.past}
          />
          <DashboardAverageReadingTimeCard
            title="Monhtly"
            current={data.readingTimes.monthly.current}
            past={data.readingTimes.monthly.past}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardAverageReadingTime;
