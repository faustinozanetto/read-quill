import { useBookReviewDetailsLikes } from '@modules/books/hooks/review/use-book-review-details-likes';
import { useBookStore } from '@modules/books/state/book.slice';
import React from 'react';

import UserBookReviewDetailsLikesTable from './user-book-review-details-likes-table';
import { Separator, Skeleton } from '@read-quill/design-system';

const UserBookReviewDetailsLikes: React.FC = () => {
  const { book } = useBookStore();
  const { data, pagination, setPagination, isLoading } = useBookReviewDetailsLikes({ pageSize: 10, bookId: book?.id });

  return (
    <div className="flex flex-col rounded-lg p-4 border">
      <h2 className="text-2xl font-bold">Review Likes</h2>
      <p>
        View and manage the reactions to your book's reviews. See who has liked or disliked each review to understand
        your readers' feedback better. Engage with your audience by acknowledging their reactions and fostering a more
        interactive reading community.
      </p>

      <Separator className="my-2" />
      {isLoading && <Skeleton className="h-40 w-full" />}

      {!isLoading && data?.data?.reviewLikes.length ? (
        <UserBookReviewDetailsLikesTable
          reviewLikes={data.data.reviewLikes}
          pageCount={data.data.pageCount}
          pagination={pagination}
          setPagination={setPagination}
        />
      ) : null}

      {!isLoading && !data?.data?.reviewLikes.length ? (
        <p>
          It looks like the review for your book does not have any likes yet. Once people like or dislike your review,
          you will see them here.
        </p>
      ) : null}
    </div>
  );
};

export default UserBookReviewDetailsLikes;
