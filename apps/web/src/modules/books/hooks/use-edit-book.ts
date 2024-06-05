import { BookPatchResponse } from '@modules/api/types/books-api.types';
import { EditBookApiActionData, EditBookFormActionData } from '@modules/books/types/book-validations.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useUploadBookCover } from './use-upload-book-cover';

type EditBookMutationResult = UseMutationResult<BookPatchResponse, Error, EditBookFormActionData & { bookId: string }>;
type EditBookMutationParams = UseMutationOptions<BookPatchResponse, Error, EditBookFormActionData & { bookId: string }>;

interface UseEditBookReturn {
  editBook: EditBookMutationResult['mutateAsync'];
  isPending: EditBookMutationResult['isPending'];
  isCoverUploading: boolean;
}

export interface UseEditBookParams {
  onSuccess: NonNullable<EditBookMutationParams['onSuccess']>;
}

export const useEditBook = (params: UseEditBookParams): UseEditBookReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();
  const { uploadCover, isPending: isBookCoverUploadPending } = useUploadBookCover();

  const { mutateAsync, isPending } = useMutation<BookPatchResponse, Error, EditBookFormActionData & { bookId: string }>(
    {
      mutationKey: ['book-edit'],
      mutationFn: async (data) => {
        const { bookId, coverImage, startedAt, finishedAt, ...rest } = data;

        let imageId: string | undefined;
        if (coverImage && coverImage.length > 0) {
          const coverFile = await uploadCover({ coverImage });
          if (!coverFile.data?.coverImage) throw new Error('Could not upload cover file!');

          imageId = coverFile.data.coverImage.id;
        }

        const url = new URL('/api/book', __URL__);
        const body = JSON.stringify({
          bookId,
          startedAt: startedAt ? new Date(startedAt) : undefined,
          finishedAt: finishedAt ? new Date(finishedAt) : undefined,
          imageId,
          ...rest,
        });

        const response = await fetch(url, { method: 'PATCH', body });
        const responseData = (await response.json()) as BookPatchResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      },
      onSuccess,
      onError(error) {
        toast({ variant: 'error', content: error.message });
      },
    }
  );

  return { isPending, editBook: mutateAsync, isCoverUploading: isBookCoverUploadPending };
};
