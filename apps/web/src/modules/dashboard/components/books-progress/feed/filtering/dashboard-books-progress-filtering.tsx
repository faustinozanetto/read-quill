import React from 'react';
import { Button, SelectItem } from '@read-quill/design-system';
import { ResetIcon } from '@read-quill/design-system/src/components/icons';
import { useFilterActions } from '@modules/filters/hooks/use-filter-actions';
import type { NestedKeyOf, UseFilterReturn } from '@modules/filters/hooks/use-filter-data';
import FiltersSortBy from '@modules/filters/components/filters-sort-by';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';
import UserBookFilteringName from '@modules/books/components/detailed/feed/filtering/user-book-feed-filtering-name';
import { BOOKS_PROGRESS_SORT_BY } from '@modules/dashboard/lib/dashboard-filtering.lib';

interface DashboardBooksProgressFilteringProps {
  /**
   * Filter sort data.
   */
  sort: UseFilterReturn<DashboardBooksProgressGetResponse['booksProgress'][0]>['sort'];
  /**
   * Filter filters data.
   */
  filters: UseFilterReturn<DashboardBooksProgressGetResponse['booksProgress'][0]>['filters'];
}

const DashboardBooksProgressFiltering: React.FC<DashboardBooksProgressFilteringProps> = (props) => {
  const { filters, sort } = props;

  const { updateFilterValue, updateSort, resetFilter, resetFilters, resetSort } =
    useFilterActions<DashboardBooksProgressGetResponse['booksProgress'][0]>();

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('name', value);
  };

  const handleSortByChange = (
    value: NestedKeyOf<DashboardBooksProgressGetResponse['booksProgress'][0]>,
    ascending: boolean
  ): void => {
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
      <UserBookFilteringName
        filterName={filters.name.value as string}
        onFilterNameChange={handleFilterNameChange}
        onResetFilter={() => {
          resetFilter('name');
        }}
      />
      <Button
        aria-label="Reset Filters"
        className="w-full mt-auto"
        onClick={resetFilters}
        size="sm"
        variant="ghost-destructive"
      >
        <ResetIcon className="mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default DashboardBooksProgressFiltering;
