import React from 'react';
import { Button, ClearFilterIcon } from '@read-quill/design-system';
import { ResetIcon } from '@read-quill/design-system/src/components/icons';
import { useFilterActions } from '@modules/filters/hooks/use-filter-actions';
import FiltersSortBy from '@modules/filters/components/filters-sort-by';
import type { NestedKeyOf, UseFilterReturn } from '@modules/filters/hooks/use-filter-data';
import type { Achievement } from '@read-quill/database';

/**
 * Props for the AchievementFiltering component.
 */
interface AchievementsFilteringProps<TData extends Achievement> {
  /**
   * Sort criteria for filtering achievements.
   */
  sort: UseFilterReturn<TData>['sort'];
  /**
   * Function to render the sorting section.
   */
  onRenderSortBy: () => React.ReactNode;
  /**
   * Children elements to be rendered inside the filtering component.
   */
  children: React.ReactNode;
}

const AchievementsFiltering = <TData extends Achievement>(
  props: AchievementsFilteringProps<TData>
): React.JSX.Element => {
  const { sort, children, onRenderSortBy } = props;

  const { updateSort, resetFilters, resetSort } = useFilterActions<TData>();

  const handleSortByChange = (value: NestedKeyOf<TData>, ascending: boolean): void => {
    updateSort({ property: value, ascending });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <FiltersSortBy
        onResetFilter={resetSort}
        onSortByChanged={handleSortByChange}
        sortAscending={sort.ascending}
        sortBy={sort.property}
      >
        {onRenderSortBy()}
      </FiltersSortBy>

      {children}
      <Button
        aria-label="Reset Filters"
        className="w-full"
        onClick={resetFilters}
        size="sm"
        variant="ghost-destructive"
      >
        <ClearFilterIcon className="mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default AchievementsFiltering;
