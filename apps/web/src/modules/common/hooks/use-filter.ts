import { useCallback, useMemo, useState } from 'react';

/**
 * The `Filter` type is used to define a filter that can be applied to a data set.
 *
 * @param  property - The property of the data to filter on.
 * @param value - The value to filter on.
 * @param  enabled - Whether or not the filter is enabled.
 */
export interface Filter<TData> {
  enabled: boolean;
  property: keyof TData;
  value: TData[keyof TData];
}

/**
 * The `Sort` type is used to define a sort that can be applied to a data set.
 *
 * @param property - The property of the data to sort on.
 * @param ascending - Whether or not the sort should be in ascending order.
 */
export interface Sort<TData> {
  ascending: boolean;
  property: keyof TData;
}

/**
 * The `useFilter` hook is used to filter and sort a data set.
 *
 * @param data - The data to filter and sort.
 * @param filters - The filters to apply to the data.
 * @param sort - The sort to apply to the data.
 */
const useFilter = <TData>(data: TData[], initialFilters: Filter<TData>[], initialSort: Sort<TData>) => {
  const [filters, setFilters] = useState<Filter<TData>[]>(initialFilters);
  const [sort, setSort] = useState<Sort<TData>>(initialSort);

  const filteredData = useMemo(() => {
    let resultData: TData[] = data;

    for (const filter of filters) {
      if (filter.enabled) {
        resultData = resultData.filter((item) => {
          if (typeof item[filter.property] === 'string') {
            const prop = item[filter.property] as unknown[];
            return prop.includes(filter.value);
          }
          return item[filter.property] === filter.value;
        });
      }
    }

    const sortedData = [...resultData].sort((a, b) => {
      if (a[sort.property] < b[sort.property]) {
        return sort.ascending ? -1 : 1;
      }
      if (a[sort.property] > b[sort.property]) {
        return sort.ascending ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  }, [data, initialFilters, initialSort, filters, sort]);

  const updateSort = useCallback((newSort: Sort<TData>) => {
    setSort(newSort);
  }, []);

  const updateFilter = useCallback((filter: Filter<TData>) => {
    setFilters((prev) => {
      const newFilters = [...prev];
      const filterToUpdate = prev.findIndex((fil) => fil.property === filter.property);
      if (filterToUpdate === -1) return newFilters;
      newFilters[filterToUpdate] = { ...filter };
      return newFilters;
    });
  }, []);

  return { filteredData, updateSort, updateFilter };
};

export default useFilter;
