import React from 'react';
import BookAnnotationManagementAdd from '@modules/annotations/components/management/add/book-annotation-management-add';

const UserBookAnnotationsManagement: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <BookAnnotationManagementAdd />
    </div>
  );
};

export default UserBookAnnotationsManagement;
