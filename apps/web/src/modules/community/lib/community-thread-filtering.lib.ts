import type { Filter, NestedKeyOf, Sort } from '@modules/filters/hooks/use-filter-data';
import { ThreadWithDetails } from '../types/community.types';

export const THREADS_INITIAL_FILTERS: Filter<ThreadWithDetails>[] = [
  { property: 'title', value: '', shouldEnable: (value) => (value as string) !== '' },
  { property: 'author.name', value: '', shouldEnable: (value) => (value as string) !== '' },
  { property: 'commentsCount', value: 0, shouldEnable: (value) => (value as number) !== 0 },
];

export const THREADS_INITIAL_SORT: Sort<ThreadWithDetails> = { property: 'createdAt', ascending: false };

export const THREADS_SORT_BY: Partial<Record<NestedKeyOf<ThreadWithDetails>, string>> = {
  title: 'Title',
  createdAt: 'Created At',
  commentsCount: 'Comments Count',
};
