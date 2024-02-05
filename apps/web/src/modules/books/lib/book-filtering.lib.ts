import type { Book } from '@read-quill/database';
import type { Filter, Sort } from '@modules/common/hooks/use-filter-data';

export const BOOKS_INITIAL_FILTERS: Filter<Book>[] = [
  { property: 'name', value: '', shouldEnable: (value) => value !== '' },
  { property: 'language', value: '', shouldEnable: (value) => value !== 'All' },
];

export const BOOKS_INITIAL_SORT: Sort<Book> = { property: 'createdAt', ascending: false };
