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
import { analytics } from '@modules/analytics/lib/analytics.lib';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

interface BookCreateProps {
  onSuccess: UseCreateBookParams['onSuccess'];
  createButton: React.ReactNode;
}

const BookCreate: React.FC<BookCreateProps> = (props) => {
  const { createButton, onSuccess } = props;

  const { toast } = useToast();
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const addBookModalParam = searchParams.get('create-book') === 'true';

  const [dialogOpen, setDialogOpen] = useState(addBookModalParam);
  const { createBook, isCoverUploading } = useCreateBook({
    onSuccess: async (data, variables, context) => {
      if (data.data?.book && user) {
        await onSuccess(data, variables, context);
        analytics.books.trackCreate({ user: { id: user.id!, name: user.name! } }, { book: data.data.book });
        toast({ variant: 'success', content: `Book ${data.data.book.name} created successfully!` });
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
