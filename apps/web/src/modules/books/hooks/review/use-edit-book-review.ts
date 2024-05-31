import { BookReviewPatchResponse } from '@modules/api/types/books-api.types';
import { EditBookReviewFormActionData } from '@modules/books/types/book-validations.types';
import { BookWithDetails } from '@modules/books/types/book.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type EditBookReviewMutationResult = UseMutationResult<BookReviewPatchResponse, Error, EditBookReviewFormActionData>;
type EditBookReviewMutationParams = UseMutationOptions<BookReviewPatchResponse, Error, EditBookReviewFormActionData>;

interface UseEditBookReviewReturn {
  editReview: EditBookReviewMutationResult['mutateAsync'];
}

interface UseEditBookReviewParams {
  book: BookWithDetails | null;
  onSuccess: NonNullable<EditBookReviewMutationParams['onSuccess']>;
}

export const useEditBookReview = (params: UseEditBookReviewParams): UseEditBookReviewReturn => {
  const { book, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<BookReviewPatchResponse, Error, EditBookReviewFormActionData>({
    mutationKey: ['book-review-edit', book?.id],
    mutationFn: async (data) => {
      if (!book) return;

      const url = new URL('/api/books/review', __URL__);
      const body = JSON.stringify({
        bookId: book.id,
        review: data.review,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      if (!response.ok) {
        throw new Error('Could not edit book review!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    editReview: mutateAsync,
  };
};
