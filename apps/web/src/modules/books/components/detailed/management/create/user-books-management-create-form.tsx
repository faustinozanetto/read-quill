import React from 'react';
import type { z } from 'zod';
import { Button, cn, LoadingIcon, PlusIcon } from '@read-quill/design-system';
import { createBookValidationSchemaForm } from '@modules/books/validations/books.validations';

import BookForm from '@modules/books/components/forms/book-form';

export type UserBooksManagementCreateFormData = z.infer<typeof createBookValidationSchemaForm>;

interface UserBooksManagementCreateFormProps {
  isBookCoverUploading: boolean;
  onSubmit: (data: UserBooksManagementCreateFormData) => void;
}

const UserBooksManagementCreateForm: React.FC<UserBooksManagementCreateFormProps> = (props) => {
  const { onSubmit, isBookCoverUploading } = props;

  return (
    <BookForm resolver={createBookValidationSchemaForm} onSubmit={onSubmit}>
      {(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting || isBookCoverUploading;
        return (
          <Button
            aria-label="Create Book"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
            Create
          </Button>
        );
      }}
    </BookForm>
  );
};

export default UserBooksManagementCreateForm;
