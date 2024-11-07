import { BookGetResponse } from '@modules/api/types/books-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useToast } from '@read-quill/design-system';
import { useBookContext } from './use-book-context';

interface UseFetchBookParams {
  bookId: string;
}

export const useFetchBook = (params: UseFetchBookParams) => {
  const { bookId } = params;

  const { toast } = useToast();

  // const { setBook, setIsLoading } = useBookContext();
  const { data, status } = useQuery<BookGetResponse | undefined>({
    queryKey: ['book', bookId],
    queryFn: async () => {
      try {
        const url = new URL('/api/book', __URL__);
        url.searchParams.set('bookId', bookId);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as BookGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch book!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  useEffect(() => {
    if (data && data.data?.book) {
      // setBook(data.data.book);
    }
  }, [data?.data?.book]);

  useEffect(() => {
    // setIsLoading(status === 'pending');
  }, [status]);
};
