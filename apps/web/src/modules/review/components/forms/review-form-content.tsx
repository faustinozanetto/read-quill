import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormDescription,
  FormMessage,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@read-quill/design-system';
import { CreateReviewFormActionData } from '@modules/review/types/review-validations.types';

const ReviewFormContent: React.FC = () => {
  const form = useFormContext<CreateReviewFormActionData>();

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Review</FormLabel>
          <FormControl>
            <Textarea
              placeholder="It was a great book, but the end was not what i was expecting..."
              className="min-h-20"
              {...field}
            />
          </FormControl>
          <FormDescription>Your personal review.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ReviewFormContent;
