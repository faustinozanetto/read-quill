import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FileInput,
  FormDescription,
  FormMessage,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';

const BookFormsCoverImage: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="coverImage"
      render={({ field: { onChange, ...rest } }) => (
        <FormItem className="col-span-2">
          <FormLabel>Cover Image</FormLabel>
          <FormControl>
            <FileInput
              onChange={(files) => {
                onChange(files[0]);
              }}
              {...rest}
            />
          </FormControl>
          <FormDescription>The cover of the book.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookFormsCoverImage;
