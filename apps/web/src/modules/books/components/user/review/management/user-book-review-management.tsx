import React from 'react';
import UserBookReviewManagementAdd from './add/user-book-review-management-add';
import UserBookReviewManagementEdit from './edit/user-book-review-management-edit';

interface UserBookReviewManagementProps {
  readerWrittenReview: boolean;
}

const UserBookReviewManagement: React.FC<UserBookReviewManagementProps> = (props) => {
  const { readerWrittenReview } = props;

  return (
    <div className="flex flex-col gap-2">
      {readerWrittenReview ? <UserBookReviewManagementEdit /> : <UserBookReviewManagementAdd />}
    </div>
  );
};

export default UserBookReviewManagement;
