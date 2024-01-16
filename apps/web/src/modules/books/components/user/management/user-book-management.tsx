import React from 'react';
import UserBookManagementEdit from './edit/user-book-management-edit';
import UserBookManagementDelete from './delete/user-book-management-delete';

const UserBookManagement: React.FC = () => {
  return (
    <div className="flex justify-between md:justify-start sm:justify-end md:flex-col gap-2">
      <UserBookManagementEdit />
      <UserBookManagementDelete />
    </div>
  );
};

export default UserBookManagement;
