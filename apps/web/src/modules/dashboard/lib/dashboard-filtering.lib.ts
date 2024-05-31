import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';
import type { Filter, NestedKeyOf, Sort } from '@modules/filters/hooks/use-filter-data';

export const BOOKS_PROGRESS_INITIAL_FILTERS: Filter<DashboardBooksProgressGetResponse['booksProgress'][0]>[] = [
  { property: 'name', value: '', shouldEnable: (value) => value !== '' },
  { property: 'progress', value: 0, shouldEnable: (value) => value !== 0 },
  { property: 'completed', value: 'All', shouldEnable: (value) => value !== 'All' },
];

export const BOOKS_PROGRESS_INITIAL_SORT: Sort<DashboardBooksProgressGetResponse['booksProgress'][0]> = {
  property: 'name',
  ascending: false,
};

export const BOOKS_PROGRESS_SORT_BY: Partial<
  Record<NestedKeyOf<DashboardBooksProgressGetResponse['booksProgress'][0]>, string>
> = {
  name: 'Name',
  progress: 'Progress',
};
