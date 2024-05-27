import { BookReviewPostResponse } from '@modules/api/types/books-api.types';
import { CreateBookReviewFormActionData } from '@modules/books/types/book-validations.types';
import { BookWithDetails } from '@modules/books/types/book.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type CreateBookReviewMutationResult = UseMutationResult<BookReviewPostResponse, Error, CreateBookReviewFormActionData>;
type CreateBookReviewMutationParams = UseMutationOptions<BookReviewPostResponse, Error, CreateBookReviewFormActionData>;

interface UseCreateBookReviewReturn {
  addReview: CreateBookReviewMutationResult['mutateAsync'];
}

interface UseCreateBookReviewParams {
  book: BookWithDetails | null;
  onSuccess: NonNullable<CreateBookReviewMutationParams['onSuccess']>;
}

export const useCreateBookReview = (params: UseCreateBookReviewParams): UseCreateBookReviewReturn => {
  const { book, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<BookReviewPostResponse, Error, CreateBookReviewFormActionData>({
    mutationKey: ['book-review-add', book?.id],
    mutationFn: async (data) => {
      if (!book) return;

      const url = new URL('/api/books/review', __URL__);
      const body = JSON.stringify({
        bookId: book.id,
        review: data.review,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not add book review!');
      }
      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    addReview: mutateAsync,
  };
};
