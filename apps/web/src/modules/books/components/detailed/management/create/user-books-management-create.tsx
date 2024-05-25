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
import { useMutation } from '@tanstack/react-query';
import { BookPostResponse } from '@modules/api/types/books-api.types';

const UserBooksManagementCreate: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addBookModalParam = searchParams.get('add-book-modal') === 'true';
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(addBookModalParam);

  const { uploadCover, isLoading } = useUploadBookCover();

  const { mutateAsync } = useMutation<BookPostResponse, Error, CreateBookFormActionData>({
    mutationFn: async (data) => {
      // First upload cover book to vercel blob storage.
      const coverFile = await uploadCover({ coverImage: data.coverImage });

      const url = new URL('/api/books', __URL__);
      const body = JSON.stringify({
        name: data.name,
        author: data.author,
        language: data.language,
        imageId: coverFile.coverImage.id,
        pageCount: data.pageCount,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not create book!');
      }

      return response.json();
    },
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
    onSuccess(data) {
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

        <UserBooksManagementCreateForm isBookCoverUploading={isLoading} onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBooksManagementCreate;
