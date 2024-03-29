import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { BookAnnotationsGetResponse } from '@modules/api/types/books-api.types';
import { useBookStore } from '../state/book.slice';

interface UseBookAnnotationsReturn {
  data: BookAnnotationsGetResponse;
  isFetching: boolean;
  isLoading: boolean;
}

export const useBookAnnotations = (): UseBookAnnotationsReturn => {
  const { book } = useBookStore();

  const { data, isFetching, isLoading } = useQuery<BookAnnotationsGetResponse>(['book-annotations', book?.id], {
    initialData: { annotations: [] },
    queryFn: async () => {
      if (!book) return { annotations: [] };

      const url = new URL('/api/books/annotations', __URL__);
      url.searchParams.set('bookId', book.id);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch book annotations');
      }

      return response.json();
    },
  });

  return { data, isFetching, isLoading };
};
