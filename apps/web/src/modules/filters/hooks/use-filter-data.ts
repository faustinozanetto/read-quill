import { useMemo } from 'react';
import { useFilterContext } from './use-filter-context';

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
  property: NestedKeyOf<TData>;
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
  property: NestedKeyOf<TData>;
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
  filters: Record<NestedKeyOf<TData>, Filter<TData>>;
}

interface UseFilterParams<TData> {
  /**
   * Data to filter.
   */
  data: TData[];
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
  Record<NestedKeyOf<TData>, (item: TData, value: unknown) => boolean>
>;

/**
 * Utility type for the sorting functions.
 */
export type UseFilterSortingFunctions<TData> = Partial<Record<NestedKeyOf<TData>, (a: TData, b: TData) => number>>;

/**
 * Hook for filtering data state.
 * @param params - Customization params for the hook.
 * @returns Filter return.
 */
export const useFilterData = <TData>(params: UseFilterParams<TData>): UseFilterReturn<TData> => {
  const { data, filterFunctions, sortFunctions } = params;

  const { state } = useFilterContext<TData>();

  const filteredData = useMemo(() => {
    let resultData: TData[] = data;

    Object.keys(state.filters).forEach((filterKey) => {
      const filter = state.filters[filterKey as NestedKeyOf<TData>];
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
      const key = state.sort.property;

      if (key in sortFunctions) {
        return sortFunctions[key]!(a, b) * (state.sort.ascending ? 1 : -1);
      }

      return 0;
    });

    return sortedData;
  }, [data, state.sort, state.filters, filterFunctions, sortFunctions]);

  return {
    sort: state.sort,
    filters: state.filters,
    filteredData,
  };
};
