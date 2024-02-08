import React from 'react';
import { Button, Label, RadioGroupItem, SelectItem } from '@read-quill/design-system';
import { ResetIcon } from '@read-quill/design-system/src/components/icons';
import { useFilterActions } from '@modules/filters/hooks/use-filter-actions';
import type { Book } from '@read-quill/database';
import type { NestedKeyOf, UseFilterReturn } from '@modules/filters/hooks/use-filter-data';
import FiltersSortBy from '@modules/filters/components/filters-sort-by';
import { BOOKS_FAVOURITE_OPTIONS, BOOKS_SORT_BY } from '@modules/books/lib/book-filtering.lib';
import FilterTextInput from '@modules/filters/components/inputs/filter-text-input';
import FilterSelectInput from '@modules/filters/components/inputs/filter-select-input';
import { BOOK_LANGUAGES } from '@modules/books/lib/book.constants';
import FilterRadioGroupInput from '@modules/filters/components/inputs/filter-radio-group-input';

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

  const handleFilterAuthorChange = (value: string): void => {
    updateFilterValue('author', value);
  };

  const handleFilterLanguageChange = (value: string): void => {
    updateFilterValue('language', value);
  };

  const handleFilterFavouriteChange = (value: string): void => {
    updateFilterValue('isFavourite', value);
  };

  const handleSortByChange = (value: NestedKeyOf<Book>, ascending: boolean): void => {
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
            <div className="flex items-center space-x-3 space-y-0" key={`filter-favourite-${option[0]}`}>
              <RadioGroupItem value={option[0]} />
              <Label className="font-normal">{option[1]}</Label>
            </div>
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
        <ResetIcon className="mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default UserBooksFiltering;
