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

const AnnotationFormsChapter: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="chapter"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Chapter</FormLabel>
          <FormControl>
            <Input placeholder="Chapter 5" {...field} />
          </FormControl>
          <FormDescription>Annotation chapter.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AnnotationFormsChapter;
