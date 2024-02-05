'use client';

import React from 'react';
import { ExclamationIcon } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useUnLockedAchievements } from '@modules/achievements/hooks/use-un-locked-achievements';
import { FilterProvider } from '@modules/common/components/filter/filter-provider';
import {
  UN_LOCKED_ACHIEVEMENTS_INITIAL_FILTERS,
  UN_LOCKED_ACHIEVEMENTS_INITIAL_SORT,
} from '@modules/achievements/lib/achievements-filtering.lib';
import UserUnLockedAchievementCardPlaceholder from '../cards/un-lockeed/user-un-locked-achievement-card-placeholder';
import UserUnLockedAchievementsFeed from '../feed/un-locked/user-un-locked-achievements-feed';

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

      <div className="rounded-lg border shadow">
        {isFetching || isLoading ? (
          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <UserUnLockedAchievementCardPlaceholder key={`user-achievement-placeholder-${i}`} />
            ))}
          </div>
        ) : null}

        {!(isFetching || isLoading) && data.unLockedAchievements.length > 0 && (
          <FilterProvider
            initialState={{
              initialFilters: UN_LOCKED_ACHIEVEMENTS_INITIAL_FILTERS,
              initialSort: UN_LOCKED_ACHIEVEMENTS_INITIAL_SORT,
            }}
          >
            <UserUnLockedAchievementsFeed userAchievements={data.unLockedAchievements} />
          </FilterProvider>
        )}

        {!(isFetching || isLoading) && data.unLockedAchievements.length === 0 ? (
          <div className="flex items-center justify-center gap-2">
            <div className="bg-primary p-2 rounded-lg border">
              <ExclamationIcon />
            </div>
            <p>The achievement board is ready for your story. Start your reading adventure and unlock achievements.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UnLockedAchievements;
