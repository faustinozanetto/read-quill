import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  EditIcon,
  useToast,
} from '@read-quill/design-system';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import UserBookManagementEditForm from './user-book-management-edit-form';
import { useBookStore } from '@modules/books/state/book.slice';
import { useEditBook } from '@modules/books/hooks/use-edit-book';

const UserBookManagementEdit: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();
  const { toast } = useToast();

  const { editBook, isCoverUploading } = useEditBook({
    book,
    onSuccess: async (data) => {
      if (data && data.book) {
        await queryClient.refetchQueries(['book-page', data.book.id]);
        setDialogOpen(false);

        toast({ variant: 'success', content: `Book ${data.book.name} edited successfully!` });
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

        <UserBookManagementEditForm isBookCoverUploading={isCoverUploading} onSubmit={editBook} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookManagementEdit;
