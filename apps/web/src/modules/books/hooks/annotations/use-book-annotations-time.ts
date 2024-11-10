import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';

import { BookAnnotationsTimeGetResponse } from '@modules/api/types/annotations-api.types';
import { useToast } from '@read-quill/design-system';
import { DataInterval } from '@modules/common/types/common.types';
import { Dispatch, SetStateAction, useState } from 'react';

interface UseBookAnnotationsTimeReturn
  extends Pick<UseQueryResult<BookAnnotationsTimeGetResponse | undefined>, 'data' | 'isLoading'> {
  interval: DataInterval;
  setInterval: Dispatch<SetStateAction<DataInterval>>;
}

interface UseBookAnnotationsTimeParams {
  bookId?: string;
}

const buildUrl = (bookId: string, interval: DataInterval): string => {
  const url = new URL('/api/book/annotations/time', __URL__);
  url.searchParams.set('bookId', bookId);
  url.searchParams.set('interval', interval);
  return url.toString();
};

export const useBookAnnotationsTime = (params: UseBookAnnotationsTimeParams): UseBookAnnotationsTimeReturn => {
  const { bookId } = params;

  const [interval, setInterval] = useState<DataInterval>('daily');

  const { toast } = useToast();

  const { data, status } = useQuery<BookAnnotationsTimeGetResponse | undefined>({
    queryKey: ['book-annotations-time', bookId, interval],
    enabled: !!bookId,
    queryFn: async () => {
      try {
        if (!bookId) return;

        const url = buildUrl(bookId, interval);
        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as BookAnnotationsTimeGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch book annotations time!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return {
    data,
    isLoading: status === 'pending',
    interval,
    setInterval,
  };
};
