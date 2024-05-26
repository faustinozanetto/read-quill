import { __URL__ } from '@modules/common/lib/common.constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { ThreadGetResponse } from '@modules/api/types/community-api.types';

interface UseFetchThreadParams {
  threadId: string;
}

export const useFetchThread = (params: UseFetchThreadParams) => {
  const { threadId } = params;

  const { setThread, setIsLoading } = useThreadStore();
  const { data, isFetching, isLoading } = useQuery<ThreadGetResponse>({
    queryKey: ['thread', threadId],
    queryFn: async () => {
      const url = new URL('/api/community/thread', __URL__);
      url.searchParams.set('threadId', threadId);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch thread!');
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (data && data.thread) {
      setThread(data.thread);
    }
  }, [data?.thread]);

  useEffect(() => {
    setIsLoading(isFetching || isLoading);
  }, [isFetching, isLoading]);
};
