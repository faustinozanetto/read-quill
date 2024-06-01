import React from 'react';

import { Button, cn, LoadingIcon, EditIcon } from '@read-quill/design-system';

import BookForm from '@modules/books/components/forms/book-form';
import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';
import { EditBookFormActionData } from '@modules/books/types/book-validations.types';
import { BOOK_ACTIONS_VALIDATIONS_FORMS } from '@modules/books/validations/books.validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBookStore } from '@modules/books/state/book.slice';

const STEPS_DATA: MultiStepFormStep<EditBookFormActionData>[] = [
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

interface BookEditFormProps {
  onSubmit: (data: EditBookFormActionData) => void;
  isBookCoverUploading: boolean;
}

const BookEditForm: React.FC<BookEditFormProps> = (props) => {
  const { onSubmit, isBookCoverUploading } = props;

  const { book } = useBookStore();

  return (
    <BookForm
      data={STEPS_DATA}
      resolver={zodResolver(BOOK_ACTIONS_VALIDATIONS_FORMS.EDIT)}
      defaultValues={{
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

export default BookEditForm;
