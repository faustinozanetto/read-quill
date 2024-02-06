import type { Book } from '@read-quill/database';
import type { Filter, NestedKeyOf, Sort } from '@modules/common/hooks/use-filter-data';

export const BOOKS_INITIAL_FILTERS: Filter<Book>[] = [
  { property: 'name', value: '', shouldEnable: (value) => value !== '' },
  { property: 'language', value: '', shouldEnable: (value) => value !== 'All' },
];

export const BOOKS_INITIAL_SORT: Sort<Book> = { property: 'name', ascending: false };

export const BOOKS_SORT_BY: Partial<Record<NestedKeyOf<Book>, string>> = {
  name: 'Name',
  language: 'Language',
  author: 'Author',
  pageCount: 'Page Count',
  startedAt: 'Started At',
  finishedAt: 'Finished At',
};
