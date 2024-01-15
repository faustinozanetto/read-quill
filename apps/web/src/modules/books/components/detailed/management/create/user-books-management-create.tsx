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
import UserBooksManagementCreateForm, { UserBooksManagementCreateFormData } from './user-books-management-create-form';
import { Book } from '@read-quill/database';
import { PutBlobResult } from '@vercel/blob';
import { useRouter } from 'next/navigation';

const UserBooksManagementCreate: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isBookCoverUploading, setIsBookCoverUploading] = useState(false);

  const handleUploadBookCover = async (coverFile: File): Promise<PutBlobResult> => {
    setIsBookCoverUploading(true);

    const url = new URL('/api/books/upload', process.env.NEXT_PUBLIC_URL);
    url.searchParams.set('filename', coverFile.name);

    const response = await fetch(url, {
      method: 'POST',
      body: coverFile,
    });

    if (!response.ok) {
      throw new Error('Failed to upload book cover!');
    }

    const coverBlob = (await response.json()) as PutBlobResult;
    setIsBookCoverUploading(false);

    return coverBlob;
  };

  const handleCreateBook = async (data: UserBooksManagementCreateFormData) => {
    try {
      // First upload cover book to vercel blob storage.
      const coverBlob = await handleUploadBookCover(data.coverImage);

      const url = new URL('/api/books', process.env.NEXT_PUBLIC_URL);
      const body = JSON.stringify({
        name: data.name,
        author: data.author,
        language: data.language,
        coverImage: coverBlob.url,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Create Book">
          <PlusIcon className="mr-2 stroke-current" />
          Create Book
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Book</DialogTitle>
          <DialogDescription>Register a book you started reading here.</DialogDescription>
        </DialogHeader>

        <UserBooksManagementCreateForm onSubmit={handleCreateBook} isBookCoverUploading={isBookCoverUploading} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBooksManagementCreate;
