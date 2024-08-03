'use client';

import UserLockedAchievementCard from '@modules/achievements/components/cards/locked/user-locked-achievement-card';
import UserUnLockedAchievementCardPlaceholder from '@modules/achievements/components/cards/un-lockeed/user-un-locked-achievement-card-placeholder';
import { useLockedAchievements } from '@modules/achievements/hooks/use-locked-achievements';
import { Skeleton } from '@read-quill/design-system';
import React from 'react';

const DashboardReadStreakAchievements: React.FC = () => {
  const { data, isLoading } = useLockedAchievements({ criterias: ['readDaysStreak'] });

  if (isLoading)
    return (
      <>
        <div className="flex flex-wrap justify-between items-center">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-2 md:gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <UserUnLockedAchievementCardPlaceholder key={`read-streak-achievement-placeholder-${i}`} />
          ))}
        </div>
      </>
    );

  return (
    <div className="space-y-2">
      <h4 className="font-bold text-lg">Streak Achievements</h4>
      <div className="grid auto-cols-max grid-flow-col gap-2 md:gap-4 overflow-x-auto pb-4">
        {data?.data?.lockedAchievements.map((achievement) => {
          return (
            <UserLockedAchievementCard
              key={`read-streak-achievement-${achievement.id}`}
              userAchievement={achievement}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardReadStreakAchievements;
