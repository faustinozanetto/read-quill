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

const BookFormsPageCount: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="pageCount"
      render={({ field: { onChange, ...rest } }) => (
        <FormItem>
          <FormLabel>Page Count</FormLabel>
          <FormControl>
            <Input
              inputMode="numeric"
              onChange={(e) => {
                const value = Number(e.target.value);
                onChange(value);
              }}
              placeholder="225"
              type="number"
              {...rest}
            />
          </FormControl>
          <FormDescription>The amount of pages the book has.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookFormsPageCount;
