import { useCallback, useMemo, useState } from 'react';

export type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;

/**
 * The `Filter` type is used to define a filter that can be applied to a data set.
 *
 * @param  property - The property of the data to filter on.
 * @param value - The value to filter on.
 * @param  enabled - Whether or not the filter is enabled.
 */
export interface Filter<TData> {
  value: unknown;
  property: NestedKeyOf<TData, keyof TData>;
  shouldEnable: (value: unknown) => boolean;
}

/**
 * The `Sort` type is used to define a sort that can be applied to a data set.
 *
 * @param property - The property of the data to sort on.
 * @param ascending - Whether or not the sort should be in ascending order.
 */
export interface Sort<TData> {
  ascending: boolean;
  property: NestedKeyOf<TData, keyof TData>;
}

interface UseFilterReturn<TData> {
  filteredData: TData[];
  sort: Sort<TData>;
  filters: Record<NestedKeyOf<TData, keyof TData>, Filter<TData>>;
  updateSort: (newSort: Sort<TData>) => void;
  updateFilter: (filter: Filter<TData>) => void;
  updateFilterValue: (property: NestedKeyOf<TData>, value: unknown) => void;
  resetFilters: () => void;
}

export type UseFilterFilteringFunctions<TData> = Partial<
  Record<NestedKeyOf<TData, keyof TData>, (item: TData, value: unknown) => boolean>
>;

export type UseFilterSortingFunctions<TData> = Partial<
  Record<NestedKeyOf<TData>, (a: TData, b: TData, ascending: boolean) => number>
>;

const constructFiltersRecordFromArray = <TData>(
  filters: Filter<TData>[]
): Record<NestedKeyOf<TData, keyof TData>, Filter<TData>> => {
  const filtersMap = Object.fromEntries(filters.map((filter) => [filter.property, filter])) as Record<
    NestedKeyOf<TData, keyof TData>,
    Filter<TData>
  >;

  return filtersMap;
};

/**
 * The `useFilter` hook is used to filter and sort a data set.
 */
const useFilter = <TData>(
  data: TData[],
  initialFilters: Filter<TData>[],
  initialSort: Sort<TData>,
  filterFunctions: UseFilterFilteringFunctions<TData>,
  sortingFunctions: UseFilterSortingFunctions<TData>
): UseFilterReturn<TData> => {
  const [filters, setFilters] = useState<Record<NestedKeyOf<TData, keyof TData>, Filter<TData>>>(
    constructFiltersRecordFromArray(initialFilters)
  );

  const [sort, setSort] = useState<Sort<TData>>(initialSort);

  const filteredData = useMemo(() => {
    let resultData: TData[] = data;

    Object.keys(filters).forEach((filterKey) => {
      const filter = filters[filterKey as NestedKeyOf<TData, keyof TData>];
      if (filter.shouldEnable(filter.value)) {
        resultData = resultData.filter((item) => {
          if (filter.property in filterFunctions) {
            return filterFunctions[filter.property]!(item, filter.value);
          }

          return true;
        });
      }
    });

    const sortedData = [...resultData].sort((a, b) => {
      const key = sort.property;

      if (key in sortingFunctions) {
        return sortingFunctions[key]!(a, b, sort.ascending) * (sort.ascending ? 1 : -1);
      }

      return 0;
    });

    return sortedData;
  }, [data, filters, sort, filterFunctions, sortingFunctions]);

  const updateSort = useCallback((newSort: Sort<TData>) => {
    setSort(newSort);
  }, []);

  const updateFilter = useCallback((filter: Filter<TData>) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [filter.property as string]: filter };
      return newFilters;
    });
  }, []);

  const updateFilterValue = useCallback((property: NestedKeyOf<TData, keyof TData>, value: unknown) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [property]: { ...prev[property], value } };
      return newFilters;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(constructFiltersRecordFromArray(initialFilters));
  }, [initialFilters]);

  return { filters, sort, filteredData, updateSort, updateFilter, updateFilterValue, resetFilters };
};

export default useFilter;
