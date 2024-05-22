import { useCommunityThreadStore } from '../../state/community-thread.slice';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

interface UseIsThreadOwnerReturn {
  isThreadOwner: boolean;
}

export const useIsThreadOwner = (): UseIsThreadOwnerReturn => {
  const user = useAuthContext((s) => s.user);
  const { thread } = useCommunityThreadStore();

  const isThreadOwner = Boolean(user?.id === thread?.authorId);

  return { isThreadOwner };
};
