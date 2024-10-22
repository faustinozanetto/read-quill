'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

import { useAverageReadingTime } from '@modules/dashboard/hooks/use-average-reading-time';
import DashboardAverageReadingTimeCard from './dashboard-average-reading-time-card';

const DashboardAverageReadingTime: React.FC = () => {
  const { data, isLoading } = useAverageReadingTime();

  const renderPast = (difference: number, sign: string, type: 'day' | 'week' | 'month') => {
    if (difference === 0) return `Same as last ${type}`;

    return `${sign}${difference} than last ${type}`;
  };

  return (
    <div className="rounded-lg border p-4 flex flex-col gap-2 h-fit">
      <h3 className="text-xl font-bold">📊 Average Reading Time</h3>
      <p>
        Stay informed about your reading habits with insights into your average reading times. Track your progress and
        maintain motivation by comparing your daily, weekly, monthly, and semester reading patterns.
      </p>

      {isLoading && (
        <div className="flex gap-2 overflow-x-auto justify-evenly items-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={`dashboard-average-reading-time-placeholder-${i}`} className="h-36 w-full min-w-56" />
          ))}
        </div>
      )}

      {!isLoading && data?.data?.averageReadingTimes && (
        <div className="flex gap-2 overflow-x-auto justify-evenly items-stretch">
          <DashboardAverageReadingTimeCard
            title="Daily"
            current={data.data.averageReadingTimes.daily.current}
            past={data.data.averageReadingTimes.daily.past}
            renderPast={(difference, sign) => renderPast(difference, sign, 'day')}
          />
          <DashboardAverageReadingTimeCard
            title="Weekly"
            current={data.data.averageReadingTimes.weekly.current}
            past={data.data.averageReadingTimes.weekly.past}
            renderPast={(difference, sign) => renderPast(difference, sign, 'week')}
          />
          <DashboardAverageReadingTimeCard
            title="Monhtly"
            current={data.data.averageReadingTimes.monthly.current}
            past={data.data.averageReadingTimes.monthly.past}
            renderPast={(difference, sign) => renderPast(difference, sign, 'month')}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardAverageReadingTime;
