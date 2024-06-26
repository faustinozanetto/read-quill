import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

import { useBookStore } from '../state/book.slice';

interface UseIsBookOwnerReturn {
  isBookOwner: boolean;
}

export const useIsBookOwner = (): UseIsBookOwnerReturn => {
  const { user } = useAuthContext();
  const { book } = useBookStore();

  const isBookOwner = Boolean(user?.id === book?.readerId);

  return { isBookOwner };
};
