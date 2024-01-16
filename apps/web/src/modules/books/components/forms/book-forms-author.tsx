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

const BookFormsAuthor: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="author"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Author</FormLabel>
          <FormControl>
            <Input placeholder="Robert Louis Stevenson" {...field} />
          </FormControl>
          <FormDescription>The author of the book.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookFormsAuthor;
