import React from 'react';
import { bookReviewValidationSchemaForm } from '@modules/books/validations/books.validations';
import type { z } from 'zod';
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
import { useBookStore } from '@modules/books/state/book.slice';

export type UserBookReviewManagementEditFormData = z.infer<typeof bookReviewValidationSchemaForm>;

interface UserBookReviewManagementEditFormProps {
  onSubmit: (data: UserBookReviewManagementEditFormData) => void;
}

const UserBookReviewManagementEditForm: React.FC<UserBookReviewManagementEditFormProps> = (props) => {
  const { onSubmit } = props;

  const { book } = useBookStore();

  const form = useForm<UserBookReviewManagementEditFormData>({
    resolver: zodResolver(bookReviewValidationSchemaForm),
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
              <FormLabel>Name</FormLabel>
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
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <EditIcon className="mr-2" />}
            Edit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserBookReviewManagementEditForm;
