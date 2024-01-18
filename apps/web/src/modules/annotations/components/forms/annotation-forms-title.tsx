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

const AnnotationFormsTitle: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="The Attack" {...field} />
          </FormControl>
          <FormDescription>Annotation title.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AnnotationFormsTitle;
