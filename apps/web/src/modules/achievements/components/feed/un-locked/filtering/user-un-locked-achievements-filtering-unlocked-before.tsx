import React from 'react';
import { Popover, PopoverTrigger, Button, cn, CalendarIcon, PopoverContent, Calendar } from '@read-quill/design-system';
import { format } from 'date-fns';
import UserUnLockedAchievementsFilterSection from './user-un-locked-achievements-filter-section';

interface UserUnLockedAchievementsFilteringUnlockedBeforeProps {
  filterUnlockedBefore: string;
  onFilterUnlockedBeforeChange: (value: string) => void;
}

const UserUnLockedAchievementsFilteringUnlockedBefore: React.FC<
  UserUnLockedAchievementsFilteringUnlockedBeforeProps
> = (props) => {
  const { filterUnlockedBefore, onFilterUnlockedBeforeChange } = props;

  return (
    <UserUnLockedAchievementsFilterSection title="Unlocked Before">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn('w-full text-left font-normal h-8', !filterUnlockedBefore && 'text-muted-foreground')}
            variant="outline"
          >
            {filterUnlockedBefore ? format(filterUnlockedBefore, 'PPP') : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            initialFocus
            mode="single"
            onSelect={(date) => {
              const dateValue = date?.toISOString() ?? new Date().toISOString();
              onFilterUnlockedBeforeChange(dateValue);
            }}
            selected={new Date(filterUnlockedBefore)}
          />
        </PopoverContent>
      </Popover>
    </UserUnLockedAchievementsFilterSection>
  );
};

export default UserUnLockedAchievementsFilteringUnlockedBefore;
