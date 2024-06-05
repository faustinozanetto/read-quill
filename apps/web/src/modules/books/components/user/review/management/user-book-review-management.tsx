import React from 'react';

import ReviewCreate from '@modules/review/components/create/review-create';
import {
  Button,
  DeleteIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ManageIcon,
} from '@read-quill/design-system';
import { EditIcon } from '@read-quill/design-system';
import ReviewDelete from '@modules/review/components/delete/review-delete';
import ReviewEdit from '@modules/review/components/edit/review-edit';
import { Review } from '@read-quill/database';
import { useQueryClient } from '@tanstack/react-query';

interface UserBookReviewManagementProps {
  bookId: string;
  readerWrittenReview: boolean;
  review: Review | null;
}

const UserBookReviewManagement: React.FC<UserBookReviewManagementProps> = (props) => {
  const { readerWrittenReview, review, bookId } = props;

  const queryClient = useQueryClient();

  const handleOnReviewChanged = async () => {
    await queryClient.refetchQueries({ queryKey: ['review-from-book', bookId] });
  };

  return (
    <>
      {readerWrittenReview && review ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <ManageIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuLabel>Manage Review</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ReviewEdit
              review={review}
              onSuccess={handleOnReviewChanged}
              editButton={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EditIcon className="mr-2 stroke-current" />
                  Update
                </DropdownMenuItem>
              }
            />
            <ReviewDelete
              reviewId={review.id}
              onSuccess={handleOnReviewChanged}
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
      ) : (
        <ReviewCreate
          bookId={bookId}
          onSuccess={handleOnReviewChanged}
          createButton={
            <Button aria-label="Add Review" size="sm" variant="outline">
              <EditIcon className="mr-2 stroke-current" />
              Add
            </Button>
          }
        />
      )}
    </>
  );
};

export default UserBookReviewManagement;
