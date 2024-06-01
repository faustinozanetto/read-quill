import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  buttonVariants,
  useToast,
} from '@read-quill/design-system';
import { UseDeleteBookParams, useDeleteBook } from '@modules/books/hooks/use-delete-book';

interface BookDeleteProps {
  bookId: string;
  onSuccess: UseDeleteBookParams['onSuccess'];
  deleteButton: React.ReactNode;
}

const BookDelete: React.FC<BookDeleteProps> = (props) => {
  const { bookId, deleteButton, onSuccess } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();

  const { deleteBook } = useDeleteBook({
    onSuccess: async (data, variables, context) => {
      if (data && data.success) {
        await onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book deleted successfully!` });
      }
    },
  });

  return (
    <AlertDialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <AlertDialogTrigger asChild>{deleteButton}</AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Book</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete it?. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={async () => {
              await deleteBook({ bookId });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookDelete;
