import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadAttachmentsGetResponse } from '@modules/api/types/community-api.types';
import { useToast } from '@read-quill/design-system';

export interface UseThreadAttachmentsReturn
  extends Pick<UseQueryResult<ThreadAttachmentsGetResponse | undefined>, 'data' | 'isLoading'> {}

interface UseThreadAttachmentsParams {
  threadId?: string;
}

const buildUrl = (threadId: string): string => {
  const url = new URL('/api/community/thread/attachments', __URL__);
  url.searchParams.set('threadId', threadId);
  return url.toString();
};

export const useThreadAttachments = (params: UseThreadAttachmentsParams): UseThreadAttachmentsReturn => {
  const { threadId } = params;

  const { toast } = useToast();

  const { data, status } = useQuery<ThreadAttachmentsGetResponse | undefined>({
    queryKey: ['thread-attachments', threadId],
    enabled: threadId !== undefined,
    queryFn: async () => {
      try {
        if (!threadId) return;

        const url = buildUrl(threadId);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as ThreadAttachmentsGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch thread attachments!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return {
    data,
    isLoading: status === 'pending',
  };
};
