import React from 'react';
import { Button, SelectItem } from '@read-quill/design-system';
import { ResetIcon } from '@read-quill/design-system/src/components/icons';
import { useFilterActions } from '@modules/filters/hooks/use-filter-actions';
import type { NestedKeyOf, UseFilterReturn } from '@modules/filters/hooks/use-filter-data';
import FiltersSortBy from '@modules/filters/components/filters-sort-by';
import FilterTextInput from '@modules/filters/components/inputs/filter-text-input';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { THREADS_SORT_BY } from '@modules/community/lib/community-thread-filtering.lib';
import FilterSliderInput from '@modules/filters/components/inputs/filter-slider-input';

interface CommunityThreadsFeedFilteringProps {
  /**
   * Filter sort data.
   */
  sort: UseFilterReturn<ThreadWithDetails>['sort'];
  /**
   * Filter filters data.
   */
  filters: UseFilterReturn<ThreadWithDetails>['filters'];
}

const CommunityThreadsFeedFiltering: React.FC<CommunityThreadsFeedFilteringProps> = (props) => {
  const { filters, sort } = props;

  const { updateFilterValue, updateSort, resetFilter, resetFilters, resetSort } = useFilterActions<ThreadWithDetails>();

  const handleFilterTitleChange = (value: string): void => {
    updateFilterValue('title', value);
  };

  const handleFilterAuthorNameChange = (value: string): void => {
    updateFilterValue('author.name', value);
  };

  const handleFilterKeywordsChange = (value: string): void => {
    updateFilterValue('keywords', value);
  };

  const handleFilterCommentsCountChange = (value: number): void => {
    updateFilterValue('commentsCount', value);
  };

  const handleFilterVotesChange = (value: number): void => {
    updateFilterValue('votes', value);
  };

  const handleSortByChange = (value: NestedKeyOf<ThreadWithDetails>, ascending: boolean): void => {
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
        {Object.entries(THREADS_SORT_BY).map((bookSortBy) => {
          return (
            <SelectItem key={bookSortBy[0]} value={bookSortBy[0]}>
              {bookSortBy[1]}
            </SelectItem>
          );
        })}
      </FiltersSortBy>
      <FilterTextInput
        onFilterChange={handleFilterTitleChange}
        onResetFilter={() => {
          resetFilter('title');
        }}
        placeholder="Treasure Island"
        title="Title"
        value={filters.title.value as string}
      />
      <FilterTextInput
        onFilterChange={handleFilterAuthorNameChange}
        onResetFilter={() => {
          resetFilter('author.name');
        }}
        placeholder="Robert Jones"
        title="Author"
        value={filters['author.name'].value as string}
      />
      <FilterTextInput
        onFilterChange={handleFilterKeywordsChange}
        onResetFilter={() => {
          resetFilter('keywords');
        }}
        placeholder="Robert Jones"
        title="Keywords"
        value={filters.keywords.value as string}
      />
      <FilterSliderInput
        onFilterChange={handleFilterVotesChange}
        onResetFilter={() => {
          resetFilter('votes');
        }}
        title="Votes"
        value={filters.votes.value as number}
      />
      <FilterSliderInput
        onFilterChange={handleFilterCommentsCountChange}
        onResetFilter={() => {
          resetFilter('commentsCount');
        }}
        title="Comments Count"
        value={filters.commentsCount.value as number}
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

export default CommunityThreadsFeedFiltering;
