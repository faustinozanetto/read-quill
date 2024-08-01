'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useLockedAchievements } from '@modules/achievements/hooks/use-locked-achievements';
import { FilterProvider } from '@modules/filters/components/filter-provider';
import {
  LOCKED_ACHIEVEMENTS_INITIAL_FILTERS,
  LOCKED_ACHIEVEMENTS_INITIAL_SORT,
} from '@modules/achievements/lib/achievements-filtering.lib';
import UserLockedAchievementsFeed from '../feed/locked/user-locked-achievements-feed';
import UserUnLockedAchievementCardPlaceholder from '../cards/un-lockeed/user-un-locked-achievement-card-placeholder';

const LockedAchievements: React.FC = () => {
  const { data, isLoading } = useLockedAchievements();

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

      <div className="rounded-lg border shadow">
        <FilterProvider
          initialState={{
            initialFilters: LOCKED_ACHIEVEMENTS_INITIAL_FILTERS,
            initialSort: LOCKED_ACHIEVEMENTS_INITIAL_SORT,
          }}
        >
          <UserLockedAchievementsFeed isLoading={isLoading} userAchievements={data?.data?.lockedAchievements ?? []}>
            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <UserUnLockedAchievementCardPlaceholder key={`user-achievement-placeholder-${i}`} />
                ))}
              </div>
            ) : null}
          </UserLockedAchievementsFeed>
        </FilterProvider>
      </div>
    </div>
  );
};

export default LockedAchievements;
