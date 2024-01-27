'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useLockedAchievements } from '@modules/achievements/hooks/use-locked-achievements';
import UserUnLockedAchievementCardPlaceholder from '../cards/un-lockeed/user-un-locked-achievement-card-placeholder';
import UserLockedAchievementsFeed from '../feed/user-locked-achievements-feed';

const LockedAchievements: React.FC = () => {
  const { data, isFetching, isLoading } = useLockedAchievements();

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border p-4 shadow">
        <h1 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">Locked Achievements</h1>
        <p>
          Uncover a world of achievements that showcase your reading prowess. From page-turning milestones to conquering
          entire books, these badges represent the epic chapters of your reading adventure. Dive in and celebrate your
          journey through literature. What milestone will you achieve next?
        </p>
      </div>

      <div className="rounded-lg border p-4 shadow">
        {isFetching || isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <UserUnLockedAchievementCardPlaceholder key={`user-achievement-placeholder-${i}`} />
            ))}
          </div>
        ) : null}

        {!(isFetching || isLoading) && data.lockedAchievements.length > 0 && (
          <UserLockedAchievementsFeed userAchievements={data.lockedAchievements} />
        )}

        {!(isFetching || isLoading) && data.lockedAchievements.length === 0 ? (
          <p>User did not unlock any achievements so far!</p>
        ) : null}
      </div>
    </div>
  );
};

export default LockedAchievements;
