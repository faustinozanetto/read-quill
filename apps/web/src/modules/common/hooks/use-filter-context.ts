import { useContext } from 'react';
import type { FilterContextState } from '../types/filter.types';
import { FilterContext } from '../components/filter/filter-provider';

export const useFilterContext = <TData>(): FilterContextState<TData> => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilterContext must be used within a FilterContextProvider');

  return context as FilterContextState<TData>;
};
