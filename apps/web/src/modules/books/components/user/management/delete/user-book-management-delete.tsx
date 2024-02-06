import React from 'react';
import { useToast, DeleteIcon } from '@read-quill/design-system';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useBookStore } from '@modules/books/state/book.slice';
import { __URL__ } from '@modules/common/lib/common.constants';

const UserBookManagementDelete: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation({
    mutationKey: ['delete-book', book?.id],
    mutationFn: async () => {
      if (!book) return;

      try {
        const url = new URL('/api/books', __URL__);
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
    },
  });

  return (
    <ManagementDeleteObject label="Delete Book" onDeleted={mutateAsync} variant="outline-destructive">
      <DeleteIcon className="mr-2 stroke-current" />
      Delete Book
    </ManagementDeleteObject>
  );
};

export default UserBookManagementDelete;
