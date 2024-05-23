import React from 'react';
import { FormControl, FormField, FormItem, FormMessage, MultiInput } from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';

const ThreadFormsKeywords: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="keywords"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <MultiInput placeholder="Keywords" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ThreadFormsKeywords;
