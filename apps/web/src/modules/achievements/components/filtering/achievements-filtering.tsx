import React from 'react';
import { Button } from '@read-quill/design-system';
import { ResetIcon } from '@read-quill/design-system/src/components/icons';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';

interface AchievementsFilteringProps<TData> {
  children: React.JSX.Element;
  /**
   * Function for reseting the filters and sort state.
   */
  onResetFilters: UseFilterActionsReturn<TData>['resetFilters'];
}

const AchievementsFiltering = <TData,>(props: AchievementsFilteringProps<TData>): React.JSX.Element => {
  const { children, onResetFilters } = props;

  return (
    <div className="flex flex-col justify-between gap-4 h-full">
      {children}
      <Button
        aria-label="Reset Filters"
        className="w-full"
        onClick={onResetFilters}
        size="sm"
        variant="ghost-destructive"
      >
        <ResetIcon className="mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default AchievementsFiltering;
