import { BookGetResponse } from '@modules/api/types/books-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useBookStore } from '../state/book.slice';

interface UseFetchBookParams {
  bookId: string;
}

export const useFetchBook = (params: UseFetchBookParams) => {
  const { bookId } = params;

  const { setBook, setIsLoading } = useBookStore();
  const { data, isFetching, isLoading } = useQuery<BookGetResponse>({
    queryKey: ['book-page', bookId],
    queryFn: async () => {
      const url = new URL('/api/books', __URL__);
      url.searchParams.set('bookId', bookId);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch book!');
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (data && data.book) {
      setBook(data.book);
    }
  }, [data?.book]);

  useEffect(() => {
    setIsLoading(isFetching || isLoading);
  }, [isFetching, isLoading]);
};
