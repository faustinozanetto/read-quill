import React from 'react';
import UserBookAnnotationManagementAdd from './add/user-book-annotations-management-add';

const UserBookAnnotationManagement: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <UserBookAnnotationManagementAdd />
    </div>
  );
};

export default UserBookAnnotationManagement;
