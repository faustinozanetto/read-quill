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
import type { Book } from '@read-quill/database';
import { useRouter, useSearchParams } from 'next/navigation';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useUploadBookCover } from '@modules/books/hooks/use-upload-book-cover';
import UserBooksManagementCreateForm from './user-books-management-create-form';
import { CreateBookFormActionData } from '@modules/books/types/book-validations.types';

const UserBooksManagementCreate: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { uploadBookCover, isBookCoverUploading } = useUploadBookCover();
  const searchParams = useSearchParams();

  const addBookModalParam = searchParams.get('add-book-modal') === 'true';

  const [dialogOpen, setDialogOpen] = useState(addBookModalParam);

  // TODO: upgrade to use react query mutation.
  const handleCreateBook = async (data: CreateBookFormActionData): Promise<void> => {
    try {
      // First upload cover book to vercel blob storage.
      const coverImage = data.coverImage[0];
      const coverFile = await uploadBookCover(coverImage);

      const url = new URL('/api/books', __URL__);
      const body = JSON.stringify({
        name: data.name,
        author: data.author,
        language: data.language,
        coverImage: coverFile.fileUrl,
        pageCount: data.pageCount,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not register book!');
      }

      const { book }: { book: Book } = await response.json();

      toast({ variant: 'success', content: `Book ${book.name} registered successfully!` });

      router.push(`/books/${book.id}`);
    } catch (error) {
      let errorMessage = 'Could not register book!';
      if (error instanceof Error) errorMessage = error.message;

      toast({ variant: 'error', content: errorMessage });
    }
  };

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

        <UserBooksManagementCreateForm isBookCoverUploading={isBookCoverUploading} onSubmit={handleCreateBook} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBooksManagementCreate;
