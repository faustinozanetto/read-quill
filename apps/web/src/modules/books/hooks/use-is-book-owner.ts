import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

import { useBookContext } from './use-book-context';

interface UseIsBookOwnerReturn {
  isBookOwner: boolean;
}

export const useIsBookOwner = (): UseIsBookOwnerReturn => {
  const { user } = useAuthContext();
  const { book } = useBookContext();

  const isBookOwner = Boolean(user?.id === book?.readerId);

  return { isBookOwner };
};
