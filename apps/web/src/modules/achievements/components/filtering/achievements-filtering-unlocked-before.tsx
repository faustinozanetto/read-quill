import React from 'react';
import { Popover, PopoverTrigger, Button, cn, CalendarIcon, PopoverContent, Calendar } from '@read-quill/design-system';
import { format } from 'date-fns';
import type { UseFilterActionsReturn } from '@modules/common/hooks/use-filter-actions';
import FilterSection from '@modules/common/components/filter/filter-section';

interface AchievementsFilteringUnlockedBeforeProps {
  filterUnlockedBefore: string;
  onFilterUnlockedBeforeChange: (value: string) => void;
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const AchievementsFilteringUnlockedBefore: React.FC<AchievementsFilteringUnlockedBeforeProps> = (props) => {
  const { onResetFilter, filterUnlockedBefore, onFilterUnlockedBeforeChange } = props;

  return (
    <FilterSection onResetFilter={onResetFilter} title="Unlocked Before">
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
    </FilterSection>
  );
};

export default AchievementsFilteringUnlockedBefore;
