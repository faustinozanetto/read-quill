import type { Filter, NestedKeyOf } from '../hooks/use-filter-data';

export const constructFiltersRecordFromArray = <TData>(
  filters: Filter<TData>[]
): Record<NestedKeyOf<TData, keyof TData>, Filter<TData>> => {
  const filtersMap = Object.fromEntries(filters.map((filter) => [filter.property, filter])) as Record<
    NestedKeyOf<TData, keyof TData>,
    Filter<TData>
  >;

  return filtersMap;
};
