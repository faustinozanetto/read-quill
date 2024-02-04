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

export interface UseFilterReturn<TData> {
  /**
   * Filtered data.
   */
  filteredData: TData[];
  /**
   * Sort data
   */
  sort: Sort<TData>;
  /**
   * Filters data.
   */
  filters: Record<NestedKeyOf<TData, keyof TData>, Filter<TData>>;
  /**
   * Function for updating the sort.
   * @param newSort - New sort data.
   * @returns Void.
   */
  updateSort: (newSort: Sort<TData>) => void;
  /**
   * Function for updating a filter.
   * @param filter - New filter data.
   * @returns Void.
   */
  updateFilter: (filter: Filter<TData>) => void;
  /**
   * Function used for updating a filter value. Used for example in input onChange
   * @param property - Filter property.
   * @param value - New filter value.
   * @returns Void.
   */
  updateFilterValue: (property: NestedKeyOf<TData>, value: unknown) => void;
  /**
   * Function for resetting filters and sort to initial data.
   * @returns Void.
   */
  resetFilters: () => void;
}

interface UseFilterParams<TData> {
  /**
   * Data to filter.
   */
  data: TData[];
  /**
   * Array of initial filters to use.
   */
  initialFilters: Filter<TData>[];
  /**
   * Initial sort to use.
   */
  initialSort: Sort<TData>;
  /**
   * Record of filtering functions for each type of property.
   */
  filterFunctions: UseFilterFilteringFunctions<TData>;
  /**
   * Record of sorting functions for each type of property.
   */
  sortFunctions: UseFilterSortingFunctions<TData>;
}

/**
 * Utility type for the filtering functions.
 */
export type UseFilterFilteringFunctions<TData> = Partial<
  Record<NestedKeyOf<TData, keyof TData>, (item: TData, value: unknown) => boolean>
>;

/**
 * Utility type for the sorting functions.
 */
export type UseFilterSortingFunctions<TData> = Partial<Record<NestedKeyOf<TData>, (a: TData, b: TData) => number>>;

/**
 * Function responsible for creating the filters record from an array of filters.
 * @param filters - Array of filters.
 * @returns A record from properties of TData to Filters of TData.
 */
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
 * Filtering and sorting hook for arrays of generic data.
 * @param params - Customization params for the hook.
 * @returns Filter return.
 */
const useFilter = <TData>(params: UseFilterParams<TData>): UseFilterReturn<TData> => {
  const { data, initialFilters, initialSort, filterFunctions, sortFunctions } = params;

  const [sort, setSort] = useState<Sort<TData>>(initialSort);
  const [filters, setFilters] = useState<Record<NestedKeyOf<TData, keyof TData>, Filter<TData>>>(
    constructFiltersRecordFromArray(initialFilters)
  );

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

      if (key in sortFunctions) {
        return sortFunctions[key]!(a, b) * (sort.ascending ? 1 : -1);
      }

      return 0;
    });

    return sortedData;
  }, [data, filters, sort, filterFunctions, sortFunctions]);

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
    setSort(initialSort);
  }, [initialFilters, initialSort]);

  return { filters, sort, filteredData, updateSort, updateFilter, updateFilterValue, resetFilters };
};

export default useFilter;
