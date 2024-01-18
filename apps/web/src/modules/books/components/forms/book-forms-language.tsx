import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';
import { BOOK_LANGUAGES } from '@modules/books/lib/book.constants';

const BookFormsLanguage: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="language"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Language</FormLabel>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {BOOK_LANGUAGES.map((language) => {
                return (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormDescription>The language the book is written in.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookFormsLanguage;
