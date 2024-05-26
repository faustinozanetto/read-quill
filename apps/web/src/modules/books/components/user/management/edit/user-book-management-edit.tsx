import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  useToast,
  EditIcon,
} from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useUploadBookCover } from '@modules/books/hooks/use-upload-book-cover';
import type { BookPatchResponse } from '@modules/api/types/books-api.types';
import UserBookManagementEditForm from './user-book-management-edit-form';
import { EditBookFormActionData } from '@modules/books/types/book-validations.types';
import { useBookStore } from '@modules/books/state/book.slice';

const UserBookManagementEdit: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { uploadCover, isLoading } = useUploadBookCover();

  const { mutateAsync } = useMutation<BookPatchResponse, Error, EditBookFormActionData>({
    mutationKey: ['book-edit', book?.id],
    mutationFn: async (data) => {
      try {
        if (!book) return;
        const { coverImage, startedAt, finishedAt, ...rest } = data;

        let imageId: string | undefined;
        if (coverImage && coverImage.length > 0) {
          const coverFile = await uploadCover({ coverImage });
          imageId = coverFile.coverImage.id;
        }

        const url = new URL('/api/books', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          startedAt: startedAt ? new Date(startedAt) : undefined,
          finishedAt: finishedAt ? new Date(finishedAt) : undefined,
          imageId,
          ...rest,
        });

        const response = await fetch(url, { method: 'PATCH', body });
        if (!response.ok) {
          throw new Error('Could not update book!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not update book!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: async (data) => {
      if (data && data.book) {
        await queryClient.refetchQueries(['book-page', data.book.id]);

        toast({ variant: 'success', content: `Book updated successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Update Book" variant="outline">
          <EditIcon className="mr-2 stroke-current" />
          Update Book
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
          <DialogDescription>Update your book details here..</DialogDescription>
        </DialogHeader>

        <UserBookManagementEditForm isBookCoverUploading={isLoading} onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookManagementEdit;
