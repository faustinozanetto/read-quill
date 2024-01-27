'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useUnLockedAchievements } from '@modules/achievements/hooks/use-un-locked-achievements';
import UserAchievementsFeed from '../feed/user-achievements-feed';
import UserAchievementCardPlaceholder from '../cards/user-achievement-card-placeholder';

const UnLockedAchievements: React.FC = () => {
  const { data, isFetching, isLoading } = useUnLockedAchievements();

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border p-4 shadow">
        <h1 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">Unlocked Achievements</h1>
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
              <UserAchievementCardPlaceholder key={`user-achievement-placeholder-${i}`} />
            ))}
          </div>
        ) : null}

        {!(isFetching || isLoading) && data.userAchievements.length > 0 && (
          <UserAchievementsFeed userAchievements={data.userAchievements} />
        )}

        {!(isFetching || isLoading) && data.userAchievements.length === 0 ? (
          <p>User did not unlock any achievements so far!</p>
        ) : null}
      </div>
    </div>
  );
};

export default UnLockedAchievements;
