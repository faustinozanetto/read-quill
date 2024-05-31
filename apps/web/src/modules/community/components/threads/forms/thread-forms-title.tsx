import React from 'react';
import { FormControl, FormField, FormItem, FormMessage, Input } from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';

const ThreadFormsTitle: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder="Enter a concise and descriptive title for your thread" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ThreadFormsTitle;
