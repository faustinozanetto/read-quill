import { useSession } from 'next-auth/react';
import { useBookStore } from '../state/book.slice';

interface UseIsBookOwnerReturn {
  isBookOwner: boolean;
}

export const useIsBookOwner = (): UseIsBookOwnerReturn => {
  const { data: session } = useSession();
  const { book } = useBookStore();

  const isBookOwner = Boolean(session?.user.id === book?.readerId);

  return { isBookOwner };
};
