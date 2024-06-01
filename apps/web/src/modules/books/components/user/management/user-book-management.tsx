import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  ManageIcon,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Button,
  ButtonProps,
  DropdownMenuItem,
  DeleteIcon,
  EditIcon,
} from '@read-quill/design-system';
import BookDelete from '../../delete/book-delete';
import { BookWithDetails } from '@modules/books/types/book.types';
import BookEdit from '../../edit/book-edit';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { useRouter } from 'next/navigation';

interface UserBookManagementProps extends ButtonProps {
  book: BookWithDetails;
}

const UserBookManagement: React.FC<UserBookManagementProps> = (props) => {
  const { book, size = 'icon', variant = 'outline', ...rest } = props;

  const router = useRouter();
  const { queryClient } = useQueriesStore();

  const handleOnBookDeleted = () => {
    router.push('/library');
  };

  const handleOnBookEdited = async () => {
    await queryClient.refetchQueries(['book', book.id]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={size} variant={variant} {...rest}>
          <ManageIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuLabel>Manage Book</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <BookEdit
          book={book}
          onSuccess={handleOnBookEdited}
          editButton={
            <DropdownMenuItem aria-label="Update Book" onSelect={(e) => e.preventDefault()}>
              <EditIcon className="mr-2 stroke-current" />
              Update
            </DropdownMenuItem>
          }
        />
        <BookDelete
          bookId={book.id}
          onSuccess={handleOnBookDeleted}
          deleteButton={
            <DropdownMenuItem
              className="focus:bg-destructive focus:text-destructive-foreground"
              onSelect={(e) => e.preventDefault()}
            >
              <DeleteIcon className="mr-2 stroke-current" />
              Delete
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBookManagement;
