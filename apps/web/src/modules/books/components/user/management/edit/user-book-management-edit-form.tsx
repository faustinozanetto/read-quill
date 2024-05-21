import React from 'react';
import type { z } from 'zod';
import { Button, cn, LoadingIcon, EditIcon } from '@read-quill/design-system';
import { editBookValidationSchemaForm } from '@modules/books/validations/books.validations';
import { useBookStore } from '@modules/books/state/book.slice';

import BookForm from '@modules/books/components/forms/book-form';

export type UserBookManagementEditFormData = z.infer<typeof editBookValidationSchemaForm>;

interface UserBookManagementEditFormProps {
  onSubmit: (data: UserBookManagementEditFormData) => void;
  isBookCoverUploading: boolean;
}

const UserBookManagementEditForm: React.FC<UserBookManagementEditFormProps> = (props) => {
  const { onSubmit, isBookCoverUploading } = props;

  const { book } = useBookStore();

  return (
    <BookForm
      // @ts-ignore
      resolver={editBookValidationSchemaForm}
      initialData={{
        name: book?.name,
        author: book?.author,
        language: book?.language,
        pageCount: book?.pageCount,
        startedAt: book?.startedAt ? new Date(book.startedAt).toDateString() : undefined,
        finishedAt: book?.finishedAt ? new Date(book.finishedAt).toDateString() : undefined,
      }}
      onSubmit={onSubmit}
    >
      {(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting || isBookCoverUploading;
        return (
          <Button
            aria-label="Edit Book"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <EditIcon className="mr-2 stroke-current" />}
            Edit
          </Button>
        );
      }}
    </BookForm>
  );
};

export default UserBookManagementEditForm;
