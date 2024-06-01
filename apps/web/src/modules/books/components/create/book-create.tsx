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
import { useSearchParams } from 'next/navigation';
import BookCreateForm from './book-create-form';
import { UseCreateBookParams, useCreateBook } from '@modules/books/hooks/use-create-book';

interface BookCreateProps {
  onSuccess: UseCreateBookParams['onSuccess'];
  createButton: React.ReactNode;
}

const BookCreate: React.FC<BookCreateProps> = (props) => {
  const { createButton, onSuccess } = props;

  const searchParams = useSearchParams();
  const addBookModalParam = searchParams.get('add-book-modal') === 'true';
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(addBookModalParam);
  const { createBook, isCoverUploading } = useCreateBook({
    onSuccess: async (data, variables, context) => {
      if (data && data.book) {
        onSuccess(data, variables, context);
        toast({ variant: 'success', content: `Book ${data.book.name} created successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>{createButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Book</DialogTitle>
          <DialogDescription>Register a book you started reading here.</DialogDescription>
        </DialogHeader>
        <BookCreateForm isBookCoverUploading={isCoverUploading} onSubmit={createBook} />
      </DialogContent>
    </Dialog>
  );
};

export default BookCreate;
