import React from 'react';
import { Button, SelectItem } from '@read-quill/design-system';
import { ResetIcon } from '@read-quill/design-system/src/components/icons';
import { useFilterActions } from '@modules/common/hooks/use-filter-actions';
import type { Book } from '@read-quill/database';
import type { NestedKeyOf, UseFilterReturn } from '@modules/common/hooks/use-filter-data';
import FiltersSortBy from '@modules/common/components/filter/filters-sort-by';
import { BOOKS_SORT_BY } from '@modules/books/lib/book-filtering.lib';
import UserBookFilteringName from './user-book-feed-filtering-name';
import UserBookFilteringLanguage from './user-book-feed-filtering-language';

interface UserBooksFilteringProps {
  /**
   * Filter sort data.
   */
  sort: UseFilterReturn<Book>['sort'];
  /**
   * Filter filters data.
   */
  filters: UseFilterReturn<Book>['filters'];
}

const UserBooksFiltering: React.FC<UserBooksFilteringProps> = (props) => {
  const { filters, sort } = props;

  const { updateFilterValue, updateSort, resetFilter, resetFilters, resetSort } = useFilterActions<Book>();

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('name', value);
  };

  const handleFilterLanguageChange = (value: string): void => {
    updateFilterValue('language', value);
  };

  const handleSortByChange = (value: NestedKeyOf<Book>, ascending: boolean): void => {
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
        {Object.entries(BOOKS_SORT_BY).map((bookSortBy) => {
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
      <UserBookFilteringLanguage
        filterLanguage={filters.language.value as string}
        onFilterLanguageChange={handleFilterLanguageChange}
        onResetFilter={() => {
          resetFilter('language');
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

export default UserBooksFiltering;
