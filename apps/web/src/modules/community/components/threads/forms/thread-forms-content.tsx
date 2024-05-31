import React from 'react';
import { FormControl, FormField, FormItem, FormMessage, Input, Textarea } from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';

interface ThreadFormsContentProps {
  name: string;
}

const ThreadFormsContent: React.FC<ThreadFormsContentProps> = (props) => {
  const { name } = props;
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea placeholder="Write here the content for the thread..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ThreadFormsContent;
