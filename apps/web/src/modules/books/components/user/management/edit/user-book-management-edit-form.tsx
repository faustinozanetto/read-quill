import React from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, cn, LoadingIcon, EditIcon } from '@read-quill/design-system';
import { editBookValidationSchemaForm } from '@modules/books/validations/books.validations';
import { useBookStore } from '@modules/books/state/book.slice';
import BookFormsAuthor from '@modules/books/components/forms/book-forms-author';
import BookFormsCoverImage from '@modules/books/components/forms/book-forms-cover-image';
import BookFormsFinishedAt from '@modules/books/components/forms/book-forms-finished-at';
import BookFormsLanguage from '@modules/books/components/forms/book-forms-language';
import BookFormsName from '@modules/books/components/forms/book-forms-name';
import BookFormsPageCount from '@modules/books/components/forms/book-forms-page-count';
import BookFormsStartedAt from '@modules/books/components/forms/book-forms-started-at';

export type UserBookManagementEditFormData = z.infer<typeof editBookValidationSchemaForm>;

interface UserBookManagementEditFormProps {
  onSubmit: (data: UserBookManagementEditFormData) => void;
}

const UserBookManagementEditForm: React.FC<UserBookManagementEditFormProps> = (props) => {
  const { onSubmit } = props;

  const { book } = useBookStore();

  const form = useForm<UserBookManagementEditFormData>({
    resolver: zodResolver(editBookValidationSchemaForm),
    mode: 'onBlur',
    defaultValues: {
      name: book?.name,
      author: book?.author,
      language: book?.language,
      pageCount: book?.pageCount,
      startedAt: book?.startedAt?.toDateString() ?? undefined,
      finishedAt: book?.finishedAt?.toDateString() ?? undefined,
    },
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="grid md:grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <BookFormsName />
        <BookFormsAuthor />
        <BookFormsCoverImage />
        <BookFormsLanguage />
        <BookFormsPageCount />
        <BookFormsStartedAt />
        <BookFormsFinishedAt />
        <DialogFooter className="col-span-2">
          <Button
            aria-label="Edit Book"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <EditIcon className="mr-2" />}
            Edit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserBookManagementEditForm;
