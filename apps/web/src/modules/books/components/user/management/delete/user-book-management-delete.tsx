import React from 'react';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import { useRouter } from 'next/navigation';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useBookStore } from '@modules/books/state/book.slice';
import { useDeleteBook } from '@modules/books/hooks/use-delete-book';

const UserBookManagementDelete: React.FC = () => {
  const router = useRouter();
  const { book } = useBookStore();
  const { toast } = useToast();

  const { deleteBook } = useDeleteBook({
    book,
    onSuccess: async (data) => {
      if (data && data.success) {
        router.push('/books');
        toast({ variant: 'success', content: `Book deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Book" onDeleted={deleteBook} variant="outline-destructive">
      <DeleteIcon className="mr-2 stroke-current" />
      Delete Book
    </ManagementDeleteObject>
  );
};

export default UserBookManagementDelete;
