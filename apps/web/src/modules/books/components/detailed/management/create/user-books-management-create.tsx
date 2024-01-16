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
import type { PutBlobResult } from '@vercel/blob';
import { useRouter } from 'next/navigation';
import { __URL__ } from '@modules/common/lib/common.constants';
import UserBooksManagementCreateForm from './user-books-management-create-form';
import type { UserBooksManagementCreateFormData } from './user-books-management-create-form';

const UserBooksManagementCreate: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isBookCoverUploading, setIsBookCoverUploading] = useState(false);

  const handleUploadBookCover = async (coverFile: File): Promise<PutBlobResult> => {
    setIsBookCoverUploading(true);

    const url = new URL('/api/books/upload', __URL__);
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

      const url = new URL('/api/books', __URL__);
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
