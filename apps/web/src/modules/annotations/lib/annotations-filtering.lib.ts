import type { Annotation } from '@read-quill/database';
import type { Filter, NestedKeyOf, Sort } from '@modules/filters/hooks/use-filter-data';

export const ANNOTATIONS_INITIAL_FILTERS: Filter<Annotation>[] = [
  { property: 'chapter', value: '', shouldEnable: (value) => value !== '' },
  { property: 'title', value: '', shouldEnable: (value) => value !== '' },
];

export const ANNOTATIONS_INITIAL_SORT: Sort<Annotation> = { property: 'createdAt', ascending: false };

export const ANNOTATIONS_SORT_BY: Partial<Record<NestedKeyOf<Annotation>, string>> = {
  chapter: 'Chapter',
  title: 'Title',
  createdAt: 'Created At',
};
