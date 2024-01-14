import React from 'react';

import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  PlusIcon,
} from '@read-quill/design-system';

const UserBooksManagementCreate: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Create Book">
          <PlusIcon className="mr-2 stroke-current" />
          Create Book
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Book</DialogTitle>
          <DialogDescription>Register a book you started reading here.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserBooksManagementCreate;
