import type { Filter, NestedKeyOf } from '@modules/filters/hooks/use-filter-data';
import { constructFiltersRecordFromArray } from '@modules/filters/lib/filter.lib';
import type { FilterState, FilterActions } from '@modules/common/types/filter.types';
import { FilterActionType } from '@modules/common/types/filter.types';

export const filterReducer = <TData>(state: FilterState<TData>, action: FilterActions<TData>): FilterState<TData> => {
  switch (action.type) {
    case FilterActionType.UPDATE_SORT: {
      return {
        ...state,
        sort: action.payload.sort,
      };
    }
    case FilterActionType.UPDATE_FILTER: {
      const newFilters: Record<NestedKeyOf<TData, keyof TData>, Filter<TData>> = {
        ...state.filters,
        [action.payload.filter.property as string]: action.payload.filter,
      };

      return {
        ...state,
        filters: newFilters,
      };
    }
    case FilterActionType.UPDATE_FILTER_VALUE: {
      const newFilters: Record<NestedKeyOf<TData, keyof TData>, Filter<TData>> = {
        ...state.filters,
        [action.payload.property]: { ...state.filters[action.payload.property], value: action.payload.value },
      };

      return {
        ...state,
        filters: newFilters,
      };
    }
    case FilterActionType.RESET_FILTER: {
      const initialFilterData = state.initialFilters.find(
        (initialFilter) => initialFilter.property === action.payload.property
      );
      if (!initialFilterData) return { ...state };

      const newFilters: Record<NestedKeyOf<TData, keyof TData>, Filter<TData>> = {
        ...state.filters,
        [action.payload.property]: { ...initialFilterData },
      };

      return {
        ...state,
        filters: newFilters,
      };
    }
    case FilterActionType.RESET_FILTERS: {
      const newFilters = constructFiltersRecordFromArray(state.initialFilters);
      return {
        ...state,
        filters: newFilters,
      };
    }
    case FilterActionType.RESET_SORT: {
      return {
        ...state,
        sort: state.initialSort,
      };
    }

    default:
      throw new Error('The action you requested does not exists!');
  }
};
