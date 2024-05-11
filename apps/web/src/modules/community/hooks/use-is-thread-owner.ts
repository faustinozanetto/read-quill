import { useSession } from 'next-auth/react';
import { useCommunityThreadStore } from '../state/state/community-thread.slice';

interface UseIsThreadOwnerReturn {
  isThreadOwner: boolean;
}

export const useIsThreadOwner = (): UseIsThreadOwnerReturn => {
  const { data: session } = useSession();
  const { thread } = useCommunityThreadStore();

  const isThreadOwner = Boolean(session?.user.id === thread?.authorId);

  return { isThreadOwner };
};
