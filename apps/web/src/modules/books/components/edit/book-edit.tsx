import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  useToast,
} from '@read-quill/design-system';
import { UseEditBookParams, useEditBook } from '@modules/books/hooks/use-edit-book';
import { BookWithDetails } from '@modules/books/types/book.types';
import BookEditForm from './book-edit-form';

interface BookEditProps {
  book: BookWithDetails;
  onSuccess: UseEditBookParams['onSuccess'];
  editButton: React.ReactNode;
}

const BookEdit: React.FC<BookEditProps> = (props) => {
  const { book, editButton, onSuccess } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();

  const { editBook, isCoverUploading } = useEditBook({
    book,
    onSuccess: async (data, variables, context) => {
      if (data.book) {
        await onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book ${data.book.name} edited successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>{editButton}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
          <DialogDescription>Update your book details here..</DialogDescription>
        </DialogHeader>

        <BookEditForm isBookCoverUploading={isCoverUploading} onSubmit={editBook} />
      </DialogContent>
    </Dialog>
  );
};

export default BookEdit;
