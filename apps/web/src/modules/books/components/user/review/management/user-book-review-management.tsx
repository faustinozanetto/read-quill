import React from 'react';

import ReviewCreate from '@modules/review/components/create/review-create';
import { Button } from '@read-quill/design-system';
import { EditIcon } from '@read-quill/design-system';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import ReviewDelete from '@modules/review/components/delete/review-delete';
import ReviewEdit from '@modules/review/components/edit/review-edit';
import { Review } from '@read-quill/database';

interface UserBookReviewManagementProps {
  bookId: string;
  readerWrittenReview: boolean;
  review: Review | null;
}

const UserBookReviewManagement: React.FC<UserBookReviewManagementProps> = (props) => {
  const { readerWrittenReview, review, bookId } = props;

  const { queryClient } = useQueriesStore();

  const handleOnReviewChanged = async () => {
    await queryClient.refetchQueries(['review-from-book', bookId]);
  };

  return (
    <div className="flex flex-col gap-2">
      {readerWrittenReview && review ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          <ReviewEdit
            review={review}
            onSuccess={handleOnReviewChanged}
            editButton={
              <Button aria-label="Update Review" size="sm" variant="outline">
                <EditIcon className="mr-2 stroke-current" />
                Update
              </Button>
            }
          />
          <ReviewDelete reviewId={review.id} onSuccess={handleOnReviewChanged} deleteButton={<h1>hi</h1>} />
        </div>
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
    </div>
  );
};

export default UserBookReviewManagement;
