import type { Filter, NestedKeyOf, Sort } from '../../filters/hooks/use-filter-data';
import type { ActionMap } from './common.types';

export interface FilterState<TData> {
  initialSort: Sort<TData>;
  initialFilters: Filter<TData>[];
  sort: Sort<TData>;
  filters: Record<NestedKeyOf<TData>, Filter<TData>>;
}

export interface FilterContextState<TData> {
  state: FilterState<TData>;
  dispatch: React.Dispatch<FilterActions<TData>>;
}

/* eslint-disable @typescript-eslint/naming-convention -- Enums do not need that formatting. */
export enum FilterActionType {
  UPDATE_SORT,
  UPDATE_FILTER,
  UPDATE_FILTER_VALUE,
  RESET_FILTERS,
  RESET_FILTER,
  RESET_SORT,
}

/* eslint-disable @typescript-eslint/consistent-type-definitions -- Disable rule to prevent eslint forcing FilterPayload to be a interface. */
type FilterPayload<TData> = {
  [FilterActionType.UPDATE_SORT]: {
    sort: Sort<TData>;
  };
  [FilterActionType.UPDATE_FILTER]: {
    filter: Filter<TData>;
  };
  [FilterActionType.UPDATE_FILTER_VALUE]: {
    property: NestedKeyOf<TData>;
    value: unknown;
  };
  [FilterActionType.RESET_FILTERS]: object;
  [FilterActionType.RESET_FILTER]: {
    property: NestedKeyOf<TData>;
  };
  [FilterActionType.RESET_SORT]: object;
};

export type FilterActions<TData> = ActionMap<FilterPayload<TData>>[keyof ActionMap<FilterPayload<TData>>];
