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

const BookFormsName: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Treasure Island" {...field} />
          </FormControl>
          <FormDescription>The name of the book.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookFormsName;
