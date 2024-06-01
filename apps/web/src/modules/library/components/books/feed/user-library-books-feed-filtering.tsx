import React from 'react';
import { Button, ClearFilterIcon, Label, RadioGroupItem, SelectItem } from '@read-quill/design-system';
import { useFilterActions } from '@modules/filters/hooks/use-filter-actions';
import type { NestedKeyOf, UseFilterReturn } from '@modules/filters/hooks/use-filter-data';
import FiltersSortBy from '@modules/filters/components/filters-sort-by';
import { BOOKS_FAVOURITE_OPTIONS, BOOKS_SORT_BY } from '@modules/books/lib/book-filtering.lib';
import FilterTextInput from '@modules/filters/components/inputs/filter-text-input';
import FilterSelectInput from '@modules/filters/components/inputs/filter-select-input';
import { BOOK_LANGUAGES } from '@modules/books/lib/book.constants';
import FilterRadioGroupInput from '@modules/filters/components/inputs/filter-radio-group-input';
import { BookWithDetails } from '@modules/books/types/book.types';
import FilterRadioGroupInputEntry from '@modules/filters/components/inputs/filter-radio-group-input-entry';

interface UserLibraryBooksFilteringProps {
  /**
   * Filter sort data.
   */
  sort: UseFilterReturn<BookWithDetails>['sort'];
  /**
   * Filter filters data.
   */
  filters: UseFilterReturn<BookWithDetails>['filters'];
}

const UserLibraryBooksFiltering: React.FC<UserLibraryBooksFilteringProps> = (props) => {
  const { filters, sort } = props;

  const { updateFilterValue, updateSort, resetFilter, resetFilters, resetSort } = useFilterActions<BookWithDetails>();

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('name', value);
  };

  const handleFilterAuthorChange = (value: string): void => {
    updateFilterValue('author', value);
  };

  const handleFilterLanguageChange = (value: string): void => {
    updateFilterValue('language', value);
  };

  const handleFilterFavouriteChange = (value: string): void => {
    updateFilterValue('isFavourite', value);
  };

  const handleSortByChange = (value: NestedKeyOf<BookWithDetails>, ascending: boolean): void => {
    updateSort({ property: value, ascending });
  };

  const languages = ['All', ...BOOK_LANGUAGES];

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
      <FilterTextInput
        onFilterChange={handleFilterNameChange}
        onResetFilter={() => {
          resetFilter('name');
        }}
        placeholder="Treasure Island"
        title="Name"
        value={filters.name.value as string}
      />
      <FilterTextInput
        onFilterChange={handleFilterAuthorChange}
        onResetFilter={() => {
          resetFilter('author');
        }}
        placeholder="Jules Verne"
        title="Author"
        value={filters.author.value as string}
      />
      <FilterSelectInput
        onFilterChange={handleFilterLanguageChange}
        onResetFilter={() => {
          resetFilter('language');
        }}
        placeholder="English"
        title="Language"
        value={filters.language.value as string}
      >
        {languages.map((language) => {
          return (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          );
        })}
      </FilterSelectInput>
      <FilterRadioGroupInput
        onFilterChange={handleFilterFavouriteChange}
        onResetFilter={() => {
          resetFilter('isFavourite');
        }}
        title="Favourite"
        value={filters.isFavourite.value as string}
      >
        {Object.entries(BOOKS_FAVOURITE_OPTIONS).map((option) => {
          return (
            <FilterRadioGroupInputEntry key={`filter-favourite-${option[0]}`} value={option[0]}>
              {option[1]}
            </FilterRadioGroupInputEntry>
          );
        })}
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

export default UserLibraryBooksFiltering;
