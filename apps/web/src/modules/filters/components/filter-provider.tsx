import type { Reducer } from 'react';
import React, { createContext, useMemo, useReducer } from 'react';
import { filterReducer } from '@modules/filters/context/filter/filter-reducer';
import type { FilterActions, FilterState } from '@modules/common/types/filter.types';
import { constructFiltersRecordFromArray } from '@modules/filters/lib/filter.lib';

interface FilterContextValue<TData> {
  /** The current state of the filters. */
  state: FilterState<TData>;
  /** Function to dispatch actions to update the filter state. */
  dispatch: React.Dispatch<FilterActions<TData>>;
}

export const FilterContext = createContext<FilterContextValue<any>>({} as FilterContextValue<any>);

interface FilterProviderProps<TData> {
  /** Initial state of the filters including initial filters and sort settings. */
  initialState: Pick<FilterState<TData>, 'initialFilters' | 'initialSort'>;
  /** Children components that will have access to the filter context. */
  children: React.ReactNode;
}

export const FilterProvider = <TData,>({ initialState, children }: FilterProviderProps<TData>): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<FilterState<TData>, FilterActions<TData>>>(filterReducer, {
    ...initialState,
    sort: initialState.initialSort,
    filters: constructFiltersRecordFromArray(initialState.initialFilters),
  });

  const value: FilterContextValue<TData> = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
