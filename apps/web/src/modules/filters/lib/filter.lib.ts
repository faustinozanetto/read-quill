import type { Filter, NestedKeyOf } from '../hooks/use-filter-data';

/**
 * Constructs a record from an array of filters.
 *
 * @param filters - An array of filters.
 * @returns A record mapping filter properties to filter objects.
 */
export const constructFiltersRecordFromArray = <TData>(
  filters: Filter<TData>[]
): Record<NestedKeyOf<TData, keyof TData>, Filter<TData>> => {
  const filtersMap = Object.fromEntries(filters.map((filter) => [filter.property, filter])) as Record<
    NestedKeyOf<TData, keyof TData>,
    Filter<TData>
  >;

  return filtersMap;
};
