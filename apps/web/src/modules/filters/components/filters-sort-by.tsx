import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Button,
  SortAscIcon,
  SortDescIcon,
} from '@read-quill/design-system';
import type { NestedKeyOf } from '@modules/filters/hooks/use-filter-data';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';
import FilterSection from '@modules/filters/components/filter-section';

/**
 * Props for the FiltersSortBy component.
 */
interface FiltersSortByProps<TData> {
  /** Children elements representing options for sorting. */
  children: React.ReactNode;
  /** The key to sort by. */
  sortBy: NestedKeyOf<TData>;
  /** Indicates whether the sort order is ascending. */
  sortAscending: boolean;
  /** Function called when the sort criteria changes. */
  onSortByChanged: (value: NestedKeyOf<TData>, ascending: boolean) => void;
  /** Function to reset the filter to its initial state. */
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const FiltersSortBy = <TData,>(props: FiltersSortByProps<TData>): React.JSX.Element => {
  const { sortBy, children, sortAscending: initialSortAscending, onSortByChanged, onResetFilter } = props;

  const [sortValue, setSortValue] = useState<NestedKeyOf<TData>>(sortBy);
  const [sortAscending, setSortAscending] = useState(initialSortAscending);

  useEffect(() => {
    onSortByChanged(sortValue, sortAscending);
  }, [sortValue, sortAscending]);

  return (
    <FilterSection onResetFilter={onResetFilter} title="Sort By">
      <div className="flex gap-2 items-center">
        <Select
          onValueChange={(value) => {
            setSortValue(value as NestedKeyOf<TData>);
          }}
          value={sortBy}
        >
          <SelectTrigger className="w-[180px] grow">
            <SelectValue placeholder="Name" />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
        <Button
          className="h-9 w-9"
          onClick={() => {
            setSortAscending((prev) => !prev);
          }}
          size="icon"
        >
          {sortAscending ? <SortAscIcon /> : <SortDescIcon />}
        </Button>
      </div>
    </FilterSection>
  );
};

export default FiltersSortBy;
