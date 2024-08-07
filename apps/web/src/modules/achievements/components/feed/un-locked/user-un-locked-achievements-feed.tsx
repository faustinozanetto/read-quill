import React from 'react';
import { compareAsc, isBefore } from 'date-fns';
import type { Prisma } from '@read-quill/database';
import type { AchievementWithUserAchievement } from '@modules/achievements/types/achievements.types';
import type { UseFilterFilteringFunctions, UseFilterSortingFunctions } from '@modules/filters/hooks/use-filter-data';
import { useFilterData } from '@modules/filters/hooks/use-filter-data';
import FiltersShell from '@modules/filters/components/filters-shell';
import UnLockedAchievementCard from '../../cards/un-lockeed/user-un-locked-achievement-card';
import UserUnLockedAchievementsFiltering from './user-un-locked-achievements-filtering';
import { Skeleton } from '@read-quill/design-system';

interface UserUnLockedAchievementsFeedProps {
  userAchievements: AchievementWithUserAchievement[];
  isLoading: boolean;
  children?: React.ReactNode;
}

const UserUnLockedAchievementsFeed: React.FC<UserUnLockedAchievementsFeedProps> = (props) => {
  const { userAchievements, isLoading, children } = props;

  const filterFunctions: UseFilterFilteringFunctions<AchievementWithUserAchievement> = {
    name: (item, value) => item.name.toLowerCase().includes((value as string).toLowerCase()),
    criteria: (item, value) => {
      const criterias = Object.keys(item.criteria as Prisma.JsonObject);

      return criterias.some((criteria) => (value as string[]).includes(criteria));
    },
    unlockedAt: (item, value) => {
      const unlockedAtDate = item.unlockedAt ? new Date(item.unlockedAt) : new Date();
      const beforeUnlockedAtDate = new Date(value as string);
      return isBefore(unlockedAtDate, beforeUnlockedAtDate);
    },
  };

  const sortFunctions: UseFilterSortingFunctions<AchievementWithUserAchievement> = {
    name: (a, b) => a.name.localeCompare(b.name),
    unlockedAt: (a, b) => {
      const aDate = a.unlockedAt ? new Date(a.unlockedAt) : new Date();
      const bDate = b.unlockedAt ? new Date(b.unlockedAt) : new Date();

      return compareAsc(aDate, bDate);
    },
  };

  const { filteredData, sort, filters, noResults } = useFilterData<AchievementWithUserAchievement>({
    data: userAchievements,
    filterFunctions,
    sortFunctions,
  });

  return (
    <FiltersShell
      onRenderFilters={() => {
        return <UserUnLockedAchievementsFiltering filters={filters} sort={sort} />;
      }}
    >
      <div className="p-4 grow flex flex-col gap-4">
        {isLoading ? (
          <Skeleton className="h-4 w-52" />
        ) : (
          <span className="font-medium">Showing {filteredData.length} Achievements</span>
        )}

        {noResults ? (
          <p className="my-auto text-center">
            It looks like there are <strong>no achievements</strong> that match your current filters, try adjusting your
            filters!
          </p>
        ) : (
          <>
            {filteredData.length > 0 && (
              <div className="max-h-[600px] overflow-y-auto justify-items-stretch content-start grid gap-2.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                {filteredData.map((userAchievement) => {
                  return (
                    <UnLockedAchievementCard
                      key={`unlocked-achievement-${userAchievement.id}`}
                      userAchievement={userAchievement}
                    />
                  );
                })}
              </div>
            )}
            {children}
          </>
        )}
      </div>
    </FiltersShell>
  );
};

export default UserUnLockedAchievementsFeed;
