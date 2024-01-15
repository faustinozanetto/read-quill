import React from 'react';
import { useToast, DeleteIcon } from '@read-quill/design-system';
import { useRouter } from 'next/navigation';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useBookStore } from '@modules/books/state/book.slice';

const UserBookManagementDelete: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { book } = useBookStore();

  const handleDeleteBook = async () => {
    if (!book) return;

    try {
      const url = new URL('/api/books', process.env.NEXT_PUBLIC_URL);
      const body = JSON.stringify({
        bookId: book.id,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      if (!response.ok) {
        throw new Error('Could not delete book!');
      }

      toast({ variant: 'success', content: `Book ${book.name} deleted successfully!` });

      router.push('/books');
    } catch (error) {
      let errorMessage = 'Could not delete book!';
      if (error instanceof Error) errorMessage = error.message;

      toast({ variant: 'error', content: errorMessage });
    }
  };

  return (
    <ManagementDeleteObject label="Delete Book" onDeleted={handleDeleteBook}>
      <DeleteIcon className="mr-2 stroke-current" />
      Delete Book
    </ManagementDeleteObject>
  );
};

export default UserBookManagementDelete;
