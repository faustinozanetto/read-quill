import React from 'react';
import UserBookAnnotationsHeader from './user-book-annotations-header';
import UserBookAnnotationsContent from './user-book-annotations-content';

const UserBookAnnotations: React.FC = () => {
  return (
    <div className="flex flex-col rounded-lg p-4 shadow border gap-2">
      <UserBookAnnotationsHeader />
      <UserBookAnnotationsContent />
    </div>
  );
};

export default UserBookAnnotations;
