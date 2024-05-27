import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  PlusIcon,
  useToast,
} from '@read-quill/design-system';
import { useRouter, useSearchParams } from 'next/navigation';
import UserBooksManagementCreateForm from './user-books-management-create-form';
import { useCreateBook } from '@modules/books/hooks/use-create-book';

const UserBooksManagementCreate: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addBookModalParam = searchParams.get('add-book-modal') === 'true';
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(addBookModalParam);
  const { createBook, isCoverUploading } = useCreateBook({
    onSuccess: async (data) => {
      if (data && data.book) {
        router.push(`/books/${data.book.id}`);
        toast({ variant: 'success', content: `Book ${data.book.name} created successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Create Book" size="sm">
          <PlusIcon className="mr-2 stroke-current" />
          Create Book
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Book</DialogTitle>
          <DialogDescription>Register a book you started reading here.</DialogDescription>
        </DialogHeader>

        <UserBooksManagementCreateForm isBookCoverUploading={isCoverUploading} onSubmit={createBook} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBooksManagementCreate;
