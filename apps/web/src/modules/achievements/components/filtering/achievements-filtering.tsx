import React from 'react';
import { Button } from '@read-quill/design-system';
import { ResetIcon } from '@read-quill/design-system/src/components/icons';
import type { UseFilterReturn } from '@modules/common/hooks/use-filter';

interface AchievementsFilteringProps<TData> {
  children: React.JSX.Element;
  /**
   * Function for reseting the filters and sort state.
   */
  resetFilters: UseFilterReturn<TData>['resetFilters'];
}

const AchievementsFiltering = <TData,>(props: AchievementsFilteringProps<TData>): React.JSX.Element => {
  const { children, resetFilters } = props;

  return (
    <div className="flex flex-col justify-between h-full mb-[64px]">
      {children}
      <Button aria-label="Reset Filters" className="ml-auto" onClick={resetFilters} size="sm" variant="destructive">
        <ResetIcon className="mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default AchievementsFiltering;
