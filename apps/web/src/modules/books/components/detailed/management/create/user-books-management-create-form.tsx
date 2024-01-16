import React from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, BookIcon, cn, LoadingIcon } from '@read-quill/design-system';
import { createBookValidationSchemaForm } from '@modules/books/validations/books.validations';
import BookFormsName from '@modules/books/components/forms/book-forms-name';
import BookFormsAuthor from '@modules/books/components/forms/book-forms-author';
import BookFormsCoverImage from '@modules/books/components/forms/book-forms-cover-image';
import BookFormsLanguage from '@modules/books/components/forms/book-forms-language';
import BookFormsPageCount from '@modules/books/components/forms/book-forms-page-count';
import BookFormsStartedAt from '@modules/books/components/forms/book-forms-started-at';
import BookFormsFinishedAt from '@modules/books/components/forms/book-forms-finished-at';

export type UserBooksManagementCreateFormData = z.infer<typeof createBookValidationSchemaForm>;

interface UserBooksManagementCreateFormProps {
  isBookCoverUploading: boolean;
  onSubmit: (data: UserBooksManagementCreateFormData) => void;
}

const UserBooksManagementCreateForm: React.FC<UserBooksManagementCreateFormProps> = (props) => {
  const { onSubmit, isBookCoverUploading } = props;

  const form = useForm<UserBooksManagementCreateFormData>({
    resolver: zodResolver(createBookValidationSchemaForm),
    mode: 'onBlur',
  });

  const isFormLoading = isBookCoverUploading || form.formState.isSubmitting;

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
            aria-label="Create Book"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <BookIcon className="mr-2" />}
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserBooksManagementCreateForm;
