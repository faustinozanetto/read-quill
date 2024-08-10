'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

import { useReadStreak } from '@modules/dashboard/hooks/use-read-streak';

import DashboardReadStreakCardPlaceholder from './dashboard-read-streak-card-placeholder';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';

import DashboardReadStreakAchievements from './dashboard-read-streak-achievements';
import DashboardReadStreakInformation from './dashboard-read-streak-targets';
import DashboardReadStreakActivity from './dashboard-read-streak-activity';

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
          <div className="grid grid-flow-col auto-cols-max gap-2 md:gap-4 overflow-x-auto mt-4 pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <DashboardReadStreakCardPlaceholder key={`read-streak-placeholder-${i}`} />
            ))}
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="grid gap-2 md:gap-4 lg:grid-cols-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
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

      {!isLoading && data?.data?.readStreak ? (
        <>
          <DashboardReadStreakActivity readActivity={data.data.readActivity} readStreak={data.data.readStreak} />
          <DashboardReadStreakInformation readStreak={data.data.readStreak} totalPagesRead={data.data.totalPagesRead} />
        </>
      ) : null}

      <DashboardReadStreakAchievements />
    </div>
  );
};

export default DashboardReadStreak;
