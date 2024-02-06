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

interface FiltersSortByProps<TData> {
  children: React.ReactNode;
  /**
   * Sort by property.
   */
  sortBy: NestedKeyOf<TData>;
  /**
   * Sort asc or desc.
   */
  sortAscending: boolean;
  /**
   * Callback function when sort by changes.
   * @param value - Sort by property value.
   * @param ascending - Sort asc or desc.
   * @returns Void.
   */
  onSortByChanged: (value: NestedKeyOf<TData>, ascending: boolean) => void;
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
