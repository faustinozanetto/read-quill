import React from 'react';
import UserBookManagementEdit from './edit/user-book-management-edit';

const UserBookManagement: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <UserBookManagementEdit />
    </div>
  );
};

export default UserBookManagement;
