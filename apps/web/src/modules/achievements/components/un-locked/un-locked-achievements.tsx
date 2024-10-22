'use client';

import React from 'react';
import { ExclamationIcon } from '@read-quill/design-system';
import { useUnLockedAchievements } from '@modules/achievements/hooks/use-un-locked-achievements';
import { FilterProvider } from '@modules/filters/components/filter-provider';
import {
  UN_LOCKED_ACHIEVEMENTS_INITIAL_FILTERS,
  UN_LOCKED_ACHIEVEMENTS_INITIAL_SORT,
} from '@modules/achievements/lib/achievements-filtering.lib';
import UserUnLockedAchievementCardPlaceholder from '../cards/un-lockeed/user-un-locked-achievement-card-placeholder';
import UserUnLockedAchievementsFeed from '../feed/un-locked/user-un-locked-achievements-feed';

interface UnLockedAchievementsProps {
  userId?: string;
  onRenderHeader: React.ReactNode;
}

const UnLockedAchievements: React.FC<UnLockedAchievementsProps> = (props) => {
  const { userId, onRenderHeader } = props;
  const { data, isLoading } = useUnLockedAchievements({ userId });

  return (
    <div className="flex flex-col gap-4">
      {onRenderHeader}

      <div className="rounded-lg border">
        <FilterProvider
          initialState={{
            initialFilters: UN_LOCKED_ACHIEVEMENTS_INITIAL_FILTERS,
            initialSort: UN_LOCKED_ACHIEVEMENTS_INITIAL_SORT,
          }}
        >
          <UserUnLockedAchievementsFeed isLoading={isLoading} userAchievements={data?.data?.unLockedAchievements ?? []}>
            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <UserUnLockedAchievementCardPlaceholder key={`user-achievement-placeholder-${i}`} />
                ))}
              </div>
            ) : null}

            {!isLoading && !data?.data?.unLockedAchievements.length ? (
              <div className="flex items-center justify-center gap-2 p-4">
                <div className="bg-primary p-2 rounded-lg border">
                  <ExclamationIcon className="stroke-accent" />
                </div>
                <p>
                  The achievement board is ready for your story. Start your reading adventure and unlock achievements.
                </p>
              </div>
            ) : null}
          </UserUnLockedAchievementsFeed>
        </FilterProvider>
      </div>
    </div>
  );
};

export default UnLockedAchievements;
