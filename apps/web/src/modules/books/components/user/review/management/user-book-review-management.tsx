import React from 'react';
import UserBookReviewManagementAdd from './add/user-book-review-management-add';
import UserBookReviewManagementEdit from './edit/user-book-review-management-edit';
import UserBookReviewManagementDelete from './delete/user-book-review-management-delete';

interface UserBookReviewManagementProps {
  readerWrittenReview: boolean;
}

const UserBookReviewManagement: React.FC<UserBookReviewManagementProps> = (props) => {
  const { readerWrittenReview } = props;

  return (
    <div className="flex flex-col gap-2">
      {readerWrittenReview ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          <UserBookReviewManagementEdit />
          <UserBookReviewManagementDelete />
        </div>
      ) : (
        <UserBookReviewManagementAdd />
      )}
    </div>
  );
};

export default UserBookReviewManagement;
