import React from 'react';
import type { Prisma } from '@read-quill/database';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';
import type { UseFilterFilteringFunctions, UseFilterSortingFunctions } from '@modules/filters/hooks/use-filter-data';
import { useFilterData } from '@modules/filters/hooks/use-filter-data';
import FiltersShell from '@modules/filters/components/filters-shell';
import UserLockedAchievementCard from '../../cards/locked/user-locked-achievement-card';
import UserLockedAchievementsFiltering from './user-locked-achievements-filtering';
import { Skeleton } from '@read-quill/design-system';

interface UserLockedAchievementsFeedProps {
  userAchievements: AchievementWithProgress[];
  isLoading: boolean;
  children?: React.ReactNode;
}

const UserLockedAchievementsFeed: React.FC<UserLockedAchievementsFeedProps> = (props) => {
  const { userAchievements, isLoading, children } = props;

  const filterFunctions: UseFilterFilteringFunctions<AchievementWithProgress> = {
    name: (item, value) => item.name.toLowerCase().includes((value as string).toLowerCase()),
    criteria: (item, value) => {
      const criterias = Object.keys(item.criteria as Prisma.JsonObject);

      return criterias.some((criteria) => (value as string[]).includes(criteria));
    },
    completionPercentage: (item, value) => (value as number) >= item.completionPercentage,
  };

  const sortFunctions: UseFilterSortingFunctions<AchievementWithProgress> = {
    name: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    completionPercentage: (a, b) => {
      return a.completionPercentage >= b.completionPercentage ? 1 : -1;
    },
  };

  const { filteredData, sort, filters, noResults } = useFilterData<AchievementWithProgress>({
    data: userAchievements,
    filterFunctions,
    sortFunctions,
  });

  return (
    <FiltersShell
      onRenderFilters={() => {
        return <UserLockedAchievementsFiltering filters={filters} sort={sort} />;
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
                    <UserLockedAchievementCard
                      key={`locked-achievement-${userAchievement.id}`}
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

export default UserLockedAchievementsFeed;
