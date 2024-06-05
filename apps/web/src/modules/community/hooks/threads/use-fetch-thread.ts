import { __URL__ } from '@modules/common/lib/common.constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { ThreadGetResponse } from '@modules/api/types/community-api.types';
import { useToast } from '@read-quill/design-system';

interface UseFetchThreadParams {
  threadId: string;
}

export const useFetchThread = (params: UseFetchThreadParams) => {
  const { threadId } = params;

  const { toast } = useToast();
  const { setThread, setIsLoading } = useThreadStore();

  const { data, status } = useQuery<ThreadGetResponse | undefined>({
    queryKey: ['thread', threadId],
    queryFn: async () => {
      try {
        const url = new URL('/api/community/thread', __URL__);
        url.searchParams.set('threadId', threadId);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as ThreadGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch thread!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  useEffect(() => {
    if (data?.data?.thread) {
      setThread(data.data.thread);
    }
  }, [data?.data]);

  useEffect(() => {
    setIsLoading(status === 'pending');
  }, [status]);
};
