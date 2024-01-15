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
  PencilIcon,
  cn,
  LoadingIcon,
} from '@read-quill/design-system';

export type UserBookReviewManagementAddFormData = z.infer<typeof bookReviewValidationSchemaForm>;

interface UserBookReviewManagementAddFormProps {
  onSubmit: (data: UserBookReviewManagementAddFormData) => void;
}

const UserBookReviewManagementAddForm: React.FC<UserBookReviewManagementAddFormProps> = (props) => {
  const { onSubmit } = props;

  const form = useForm<UserBookReviewManagementAddFormData>({
    resolver: zodResolver(bookReviewValidationSchemaForm),
    mode: 'onBlur',
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
            aria-label="Add Review"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
            Add
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserBookReviewManagementAddForm;
