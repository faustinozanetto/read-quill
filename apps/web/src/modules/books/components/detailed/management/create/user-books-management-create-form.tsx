import React from 'react';

import { Button, cn, LoadingIcon, PlusIcon } from '@read-quill/design-system';

import BookForm from '@modules/books/components/forms/book-form';
import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';
import { CreateBookFormActionData } from '@modules/books/types/book-validations.types';
import { BOOK_ACTIONS_VALIDATIONS_FORMS } from '@modules/books/validations/books.validations';
import { zodResolver } from '@hookform/resolvers/zod';

const STEPS_DATA: MultiStepFormStep<CreateBookFormActionData>[] = [
  {
    title: 'Name & Author',
    fields: ['name', 'author'],
  },
  {
    title: 'Cover',
    fields: ['coverImage'],
  },
  {
    title: 'Language & Pages',
    fields: ['language', 'pageCount'],
  },
  {
    title: 'Dates',
    fields: ['startedAt', 'finishedAt'],
  },
];

interface UserBooksManagementCreateFormProps {
  isBookCoverUploading: boolean;
  onSubmit: (data: CreateBookFormActionData) => void;
}

const UserBooksManagementCreateForm: React.FC<UserBooksManagementCreateFormProps> = (props) => {
  const { onSubmit, isBookCoverUploading } = props;

  return (
    <BookForm resolver={zodResolver(BOOK_ACTIONS_VALIDATIONS_FORMS.CREATE)} data={STEPS_DATA} onSubmit={onSubmit}>
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
