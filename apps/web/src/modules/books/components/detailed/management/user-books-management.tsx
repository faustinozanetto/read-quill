import React, { Suspense } from 'react';
import UserBooksManagementCreate from './create/user-books-management-create';

const UserBooksManagement: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Suspense>
        <UserBooksManagementCreate />
      </Suspense>
    </div>
  );
};

export default UserBooksManagement;
