import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';

import { Dispatch, SetStateAction, useState } from 'react';

import { useToast } from '@read-quill/design-system';
import { BookReviewDetailsLikesGetResponse } from '@modules/api/types/books-api.types';
import { PaginationState } from '@tanstack/react-table';

export interface UseBookReviewDetailsLikesReturn
  extends Pick<UseQueryResult<BookReviewDetailsLikesGetResponse | undefined>, 'data' | 'isLoading'> {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

interface UseBookReviewDetailsLikesParams {
  pageSize: number;
  bookId?: string;
}

const buildUrl = (page: number, pageSize: number, bookId: string): string => {
  const url = new URL('/api/book/review/details/likes', __URL__);
  url.searchParams.set('pageIndex', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('bookId', bookId);
  return url.toString();
};

export const useBookReviewDetailsLikes = (params: UseBookReviewDetailsLikesParams): UseBookReviewDetailsLikesReturn => {
  const { pageSize, bookId } = params;

  const { toast } = useToast();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const { data, status } = useQuery<BookReviewDetailsLikesGetResponse | undefined>({
    queryKey: ['book-review-details-likes', bookId, pagination],
    enabled: !!bookId,
    queryFn: async () => {
      try {
        if (!bookId) return;

        const url = buildUrl(pagination.pageIndex, pagination.pageSize, bookId);
        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as BookReviewDetailsLikesGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch book review details likes!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return {
    data,
    isLoading: status === 'pending',
    pagination,
    setPagination,
  };
};
