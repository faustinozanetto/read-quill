import type { Reducer } from 'react';
import React, { createContext, useMemo, useReducer } from 'react';
import { filterReducer } from '@modules/common/context/filter/filter-reducer';
import type { FilterActions, FilterState } from '@modules/common/types/filter.types';
import { constructFiltersRecordFromArray } from '@modules/common/lib/filter.lib';

interface FilterContextValue<TData> {
  state: FilterState<TData>;
  dispatch: React.Dispatch<FilterActions<TData>>;
}

export const FilterContext = createContext<FilterContextValue<any>>({} as FilterContextValue<any>);

interface FilterProviderProps<TData> {
  initialState: Pick<FilterState<TData>, 'initialFilters' | 'initialSort'>;
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
