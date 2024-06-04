import type { DefinedUseQueryResult, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadAttachmentsGetResponse } from '@modules/api/types/community-api.types';

export interface UseThreadAttachmentsReturn
  extends Pick<UseQueryResult<ThreadAttachmentsGetResponse>, 'data' | 'isLoading'> {}

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

  const { data, isLoading, isFetching } = useQuery<ThreadAttachmentsGetResponse>(['thread-attachments', threadId], {
    keepPreviousData: true,
    enabled: threadId !== undefined,
    queryFn: async () => {
      try {
        if (!threadId) return;

        const url = buildUrl(threadId);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch thread attachments!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch thread Attachments!' });
      }
    },
  });

  return {
    data,
    isLoading: isLoading || isFetching,
  };
};
