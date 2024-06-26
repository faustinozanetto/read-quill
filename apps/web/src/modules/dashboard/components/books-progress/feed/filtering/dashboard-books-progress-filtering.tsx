import React from 'react';
import { Button, ClearFilterIcon, SelectItem } from '@read-quill/design-system';
import { ResetIcon } from '@read-quill/design-system/src/components/icons';
import { useFilterActions } from '@modules/filters/hooks/use-filter-actions';
import type { NestedKeyOf, UseFilterReturn } from '@modules/filters/hooks/use-filter-data';
import FiltersSortBy from '@modules/filters/components/filters-sort-by';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';
import { BOOKS_PROGRESS_SORT_BY } from '@modules/dashboard/lib/dashboard-filtering.lib';
import FilterTextInput from '@modules/filters/components/inputs/filter-text-input';
import FilterRadioGroupInput from '@modules/filters/components/inputs/filter-radio-group-input';
import FilterRadioGroupInputEntry from '@modules/filters/components/inputs/filter-radio-group-input-entry';
import { BookProgressEntry } from '@modules/dashboard/types/dashboard.types';

/**
 * Props for the DashboardBooksProgressFiltering component.
 */
interface DashboardBooksProgressFilteringProps {
  /**
   * Sort criteria for filtering book progress data on the dashboard.
   */
  sort: UseFilterReturn<BookProgressEntry>['sort'];
  /**
   * Filter criteria for filtering book progress data on the dashboard.
   */
  filters: UseFilterReturn<BookProgressEntry>['filters'];
}

const DashboardBooksProgressFiltering: React.FC<DashboardBooksProgressFilteringProps> = (props) => {
  const { filters, sort } = props;

  const { updateFilterValue, updateSort, resetFilter, resetFilters, resetSort } = useFilterActions<BookProgressEntry>();

  const handleFilterNameChange = (value: string) => {
    updateFilterValue('name', value);
  };

  const handleFilterCompletedChange = (value: string) => {
    updateFilterValue('completed', value);
  };

  const handleSortByChange = (value: NestedKeyOf<BookProgressEntry>, ascending: boolean): void => {
    updateSort({ property: value, ascending });
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <FiltersSortBy
        onResetFilter={resetSort}
        onSortByChanged={handleSortByChange}
        sortAscending={sort.ascending}
        sortBy={sort.property}
      >
        {Object.entries(BOOKS_PROGRESS_SORT_BY).map((bookSortBy) => {
          return (
            <SelectItem key={bookSortBy[0]} value={bookSortBy[0]}>
              {bookSortBy[1]}
            </SelectItem>
          );
        })}
      </FiltersSortBy>
      <FilterTextInput
        onFilterChange={handleFilterNameChange}
        onResetFilter={() => {
          resetFilter('name');
        }}
        placeholder="Treasure Island"
        title="Name"
        value={filters.name.value as string}
      />
      <FilterRadioGroupInput
        onFilterChange={handleFilterCompletedChange}
        onResetFilter={() => {
          resetFilter('completed');
        }}
        title="Completed"
        defaultValue="all"
        value={filters.completed.value as string}
      >
        <FilterRadioGroupInputEntry value="all">All</FilterRadioGroupInputEntry>
        <FilterRadioGroupInputEntry value="yes">Yes</FilterRadioGroupInputEntry>
        <FilterRadioGroupInputEntry value="no">No</FilterRadioGroupInputEntry>
      </FilterRadioGroupInput>
      <Button
        aria-label="Reset Filters"
        className="w-full mt-auto"
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

export default DashboardBooksProgressFiltering;
