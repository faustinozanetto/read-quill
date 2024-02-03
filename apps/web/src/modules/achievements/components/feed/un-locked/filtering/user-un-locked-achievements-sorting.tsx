import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  SortAscIcon,
  SortDescIcon,
} from '@read-quill/design-system';
import type { NestedKeyOf } from '@modules/common/hooks/use-filter';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import UserUnLockedAchievementsFilterSection from './user-un-locked-achievements-filter-section';

const SORT_BY: Record<string, string> = {
  unlockedAt: 'Unlocked At',
  'achievement.name': 'Name',
};

interface UserUnLockedAchievementsSortingProps {
  /**
   * Sort by property.
   */
  sortBy: NestedKeyOf<UserAchievementWithAchievement>;
  /**
   * Sort asc or desc.
   */
  sortAscending: boolean;
  /**
   * Callback function when sort by changes.
   * @param value - Sort by property value.
   * @param ascending - Sort asc or desc.
   * @returns Void.
   */
  onSortByChanged: (value: NestedKeyOf<UserAchievementWithAchievement>, ascending: boolean) => void;
}

const UserUnLockedAchievementsSorting: React.FC<UserUnLockedAchievementsSortingProps> = (props) => {
  const { sortBy, sortAscending: initialSortAscending, onSortByChanged } = props;

  const [sortValue, setSortValue] = useState<NestedKeyOf<UserAchievementWithAchievement>>(sortBy);
  const [sortAscending, setSortAscending] = useState(initialSortAscending);

  useEffect(() => {
    onSortByChanged(sortValue, sortAscending);
  }, [sortValue, sortAscending]);

  return (
    <UserUnLockedAchievementsFilterSection title="Sort By">
      <div className="flex gap-2 items-center">
        <Select
          onValueChange={(value) => {
            setSortValue(value as NestedKeyOf<UserAchievementWithAchievement>);
          }}
          value={sortBy}
        >
          <SelectTrigger className="w-[180px] grow">
            <SelectValue placeholder="Name" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SORT_BY).map((sort) => {
              return (
                <SelectItem key={sort[0]} value={sort[0]}>
                  {sort[1]}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Button
          className="h-9 w-9"
          onClick={() => {
            setSortAscending((prev) => !prev);
          }}
          size="icon"
        >
          {sortAscending ? <SortAscIcon /> : <SortDescIcon />}
        </Button>
      </div>
    </UserUnLockedAchievementsFilterSection>
  );
};

export default UserUnLockedAchievementsSorting;
