import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import { useThreadStore } from '@modules/community/state/thread/thread.slice';

interface UseIsThreadOwnerReturn {
  isThreadOwner: boolean;
}

export const useIsThreadOwner = (): UseIsThreadOwnerReturn => {
  const user = useAuthContext((s) => s.user);
  const { thread } = useThreadStore();

  const isThreadOwner = Boolean(user?.id === thread?.authorId);

  return { isThreadOwner };
};
