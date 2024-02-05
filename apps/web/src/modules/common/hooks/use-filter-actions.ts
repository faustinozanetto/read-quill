import { useCallback } from 'react';
import { FilterActionType } from '../types/filter.types';
import { useFilterContext } from './use-filter-context';
import type { Sort, Filter, NestedKeyOf } from './use-filter-data';

export interface UseFilterActionsReturn<TData> {
  /**
   * Function for updating the sort.
   * @param sort - New sort data.
   * @returns Void.
   */
  updateSort: (sort: Sort<TData>) => void;
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
   * Function for resetting filters to initial data.
   * @returns Void.
   */
  resetFilters: () => void;
  /**
   * Function for resetting a specific filter.
   * @param property - Filter property.
   * @returns Void.
   */
  resetFilter: (property: NestedKeyOf<TData>) => void;
  /**
   * Function for resetting sort to initial data.
   * @returns Void.
   */
  resetSort: () => void;
}

/**
 * Hook for filter actions.
 * @returns Filter actions return.
 */
export const useFilterActions = <TData>(): UseFilterActionsReturn<TData> => {
  const { dispatch } = useFilterContext<TData>();

  const updateSort = useCallback(
    (sort: Sort<TData>) => {
      dispatch({ type: FilterActionType.UPDATE_SORT, payload: { sort } });
    },
    [dispatch]
  );

  const updateFilter = useCallback(
    (filter: Filter<TData>) => {
      dispatch({ type: FilterActionType.UPDATE_FILTER, payload: { filter } });
    },
    [dispatch]
  );

  const updateFilterValue = useCallback(
    (property: NestedKeyOf<TData, keyof TData>, value: unknown) => {
      dispatch({ type: FilterActionType.UPDATE_FILTER_VALUE, payload: { property, value } });
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch({ type: FilterActionType.RESET_FILTERS, payload: {} });
  }, [dispatch]);

  const resetFilter = useCallback(
    (property: NestedKeyOf<TData, keyof TData>) => {
      dispatch({ type: FilterActionType.RESET_FILTER, payload: { property } });
    },
    [dispatch]
  );

  const resetSort = useCallback(() => {
    dispatch({ type: FilterActionType.RESET_SORT, payload: {} });
  }, [dispatch]);

  return {
    updateSort,
    updateFilter,
    updateFilterValue,
    resetFilters,
    resetFilter,
    resetSort,
  };
};
