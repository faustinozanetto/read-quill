import type { Filter, NestedKeyOf, Sort } from '@modules/filters/hooks/use-filter-data';
import { BookProgressEntry } from '../types/dashboard.types';

export const BOOKS_PROGRESS_INITIAL_FILTERS: Filter<BookProgressEntry>[] = [
  { property: 'name', value: '', shouldEnable: (value) => value !== '' },
  { property: 'progress', value: 0, shouldEnable: (value) => value !== 0 },
  { property: 'completed', value: 'All', shouldEnable: (value) => value !== 'All' },
];

export const BOOKS_PROGRESS_INITIAL_SORT: Sort<BookProgressEntry> = {
  property: 'progress',
  ascending: false,
};

export const BOOKS_PROGRESS_SORT_BY: Partial<Record<NestedKeyOf<BookProgressEntry>, string>> = {
  name: 'Name',
  progress: 'Progress',
};
