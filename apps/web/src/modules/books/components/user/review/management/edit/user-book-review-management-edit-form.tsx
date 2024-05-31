import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  cn,
  LoadingIcon,
  EditIcon,
} from '@read-quill/design-system';

import { EditBookReviewFormActionData } from '@modules/books/types/book-validations.types';
import { BOOK_ACTIONS_VALIDATIONS_FORMS } from '@modules/books/validations/books.validations';
import { useBookStore } from '@modules/books/state/book.slice';

interface UserBookReviewManagementEditFormProps {
  onSubmit: (data: EditBookReviewFormActionData) => void;
}

const UserBookReviewManagementEditForm: React.FC<UserBookReviewManagementEditFormProps> = (props) => {
  const { onSubmit } = props;

  const { book } = useBookStore();

  const form = useForm<EditBookReviewFormActionData>({
    resolver: zodResolver(BOOK_ACTIONS_VALIDATIONS_FORMS.EDIT_REVIEW),
    mode: 'onBlur',
    defaultValues: {
      review: book?.review ?? undefined,
    },
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea placeholder="It was a great book, but the end was not what i was expecting..." {...field} />
              </FormControl>
              <FormDescription>Your personal review.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            aria-label="Edit Review"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? (
              <LoadingIcon className="mr-2 stroke-current" />
            ) : (
              <EditIcon className="mr-2 stroke-current" />
            )}
            Edit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserBookReviewManagementEditForm;
