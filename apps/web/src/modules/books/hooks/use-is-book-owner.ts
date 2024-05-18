import { useBookStore } from '../state/book.slice';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

interface UseIsBookOwnerReturn {
  isBookOwner: boolean;
}

export const useIsBookOwner = (): UseIsBookOwnerReturn => {
  const user = useAuthContext((s) => s.user);
  const { book } = useBookStore();

  const isBookOwner = Boolean(user?.id === book?.readerId);

  return { isBookOwner };
};
