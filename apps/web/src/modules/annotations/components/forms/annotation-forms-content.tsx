import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Textarea,
  FormDescription,
  FormMessage,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';

const AnnotationFormsContent: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Textarea placeholder="It was a great book, but the end was not what i was expecting..." {...field} />
          </FormControl>
          <FormDescription>Annotation content.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AnnotationFormsContent;
