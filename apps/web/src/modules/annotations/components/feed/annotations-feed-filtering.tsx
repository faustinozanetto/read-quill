import React from 'react';
import { Button, ClearFilterIcon, SelectItem } from '@read-quill/design-system';
import { useFilterActions } from '@modules/filters/hooks/use-filter-actions';
import type { NestedKeyOf, UseFilterReturn } from '@modules/filters/hooks/use-filter-data';
import FiltersSortBy from '@modules/filters/components/filters-sort-by';

import FilterTextInput from '@modules/filters/components/inputs/filter-text-input';

import { Annotation } from '@read-quill/database';
import { ANNOTATIONS_SORT_BY } from '@modules/annotations/lib/annotations-filtering.lib';

interface AnnotationsFilteringProps {
  /**
   * Filter sort data.
   */
  sort: UseFilterReturn<Annotation>['sort'];
  /**
   * Filter filters data.
   */
  filters: UseFilterReturn<Annotation>['filters'];
}

const AnnotationsFiltering: React.FC<AnnotationsFilteringProps> = (props) => {
  const { filters, sort } = props;

  const { updateFilterValue, updateSort, resetFilter, resetFilters, resetSort } = useFilterActions<Annotation>();

  const handleFilterChapterChange = (value: string): void => {
    updateFilterValue('chapter', value);
  };

  const handleFilterTitleChange = (value: string): void => {
    updateFilterValue('title', value);
  };

  const handleSortByChange = (value: NestedKeyOf<Annotation>, ascending: boolean): void => {
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
        {Object.entries(ANNOTATIONS_SORT_BY).map((annotationSortBy) => {
          return (
            <SelectItem key={annotationSortBy[0]} value={annotationSortBy[0]}>
              {annotationSortBy[1]}
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
        onFilterChange={handleFilterChapterChange}
        onResetFilter={() => {
          resetFilter('chapter');
        }}
        placeholder="Chapter 5"
        title="Chapter"
        value={filters.chapter.value as string}
      />
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

export default AnnotationsFiltering;
