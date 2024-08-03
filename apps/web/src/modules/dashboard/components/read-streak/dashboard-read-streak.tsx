'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

import { useReadStreak } from '@modules/dashboard/hooks/use-read-streak';

import DashboardReadStreakCard from './dashboard-read-streak-card';
import DashboardReadStreakCardPlaceholder from './dashboard-read-streak-card-placeholder';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';

const DashboardReadStreak: React.FC = () => {
  const { data, isLoading } = useReadStreak();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2 h-fit">
      <h3 className="text-xl font-bold">🔥Read Streak</h3>
      <p>
        Keep track of your reading habits with our Days Read Streak feature! This section highlights your commitment to
        consistent reading. Each day you read, your streak grows longer, motivating you to maintain and extend your
        reading streak.
      </p>

      {isLoading && (
        <>
          <div className="flex flex-wrap justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto mt-4 pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <DashboardReadStreakCardPlaceholder key={`dashboard-average-reading-time-placeholder-${i}`} />
            ))}
          </div>
        </>
      )}

      {!isLoading && data?.data?.readStreak && (
        <>
          <div className="flex flex-wrap justify-between items-center">
            <h4 className="font-bold text-lg">Streak Activity</h4>
            <p className="text-lg mb-2">
              🎉 <span className="font-bold">{data.data.readStreak}</span> days in a row!
            </p>
          </div>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto mt-4 pb-4">
            {data.data.readActivity.map((activity) => {
              return <DashboardReadStreakCard key={`read-streak-${activity.dateRead}`} readStreak={activity} />;
            })}
          </div>
        </>
      )}

      {!isLoading && !data?.data?.readActivity.length ? (
        <DashboardNoDataMessage>
          <p>
            Your reading streak is currently at 0 days. Start reading today to build your streak and stay motivated!
          </p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardReadStreak;
