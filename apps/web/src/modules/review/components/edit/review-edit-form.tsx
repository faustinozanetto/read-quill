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

import { EditReviewFormActionData } from '@modules/review/types/review-validations.types';
import { REVIEW_ACTIONS_VALIDATIONS_FORMS } from '@modules/review/validations/reviews.validations';
import { Review } from '@read-quill/database';

interface ReviewEditFormProps {
  initialData?: Review;
  onSubmit: (data: EditReviewFormActionData) => void;
}

const ReviewEditForm: React.FC<ReviewEditFormProps> = (props) => {
  const { onSubmit, initialData } = props;

  const form = useForm<EditReviewFormActionData>({
    resolver: zodResolver(REVIEW_ACTIONS_VALIDATIONS_FORMS.EDIT),
    mode: 'onBlur',
    defaultValues: {
      ...initialData,
    },
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
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

export default ReviewEditForm;
