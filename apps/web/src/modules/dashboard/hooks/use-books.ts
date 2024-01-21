import type { Book } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { __URL__ } from '@modules/common/lib/common.constants';

interface UseBooksReturn {
  books: Book[];
  isLoading: boolean;
}

export const useBooks = (): UseBooksReturn => {
  const { data: session } = useSession();

  const { data, isLoading } = useQuery<Book[]>(['dashboard-books'], {
    initialData: [],

    queryFn: async () => {
      if (!session) return [];

      const url = new URL('/api/users/books', __URL__);
      url.searchParams.set('userId', session.user.id);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user books!');
      }

      const { books } = await response.json();
      return books;
    },
  });
  return { books: data, isLoading };
};
