import React from 'react';
import { editBookValidationSchemaForm } from '@modules/books/validations/books.validations';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  cn,
  LoadingIcon,
  EditIcon,
  Input,
  FileInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@read-quill/design-system';
import { useBookStore } from '@modules/books/state/book.slice';
import { BOOK_LANGUAGES } from '@modules/books/lib/book.constants';

export type UserBookManagementEditFormData = z.infer<typeof editBookValidationSchemaForm>;

interface UserBookManagementEditFormProps {
  onSubmit: (data: UserBookManagementEditFormData) => void;
}

const UserBookManagementEditForm: React.FC<UserBookManagementEditFormProps> = (props) => {
  const { onSubmit } = props;

  const { book } = useBookStore();

  const form = useForm<UserBookManagementEditFormData>({
    resolver: zodResolver(editBookValidationSchemaForm),
    mode: 'onBlur',
    defaultValues: {
      name: book?.name,
      author: book?.author,
      language: book?.language,
      pageCount: book?.pageCount,
    },
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
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
        {/* Author */}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Robert Louis Stevenson" {...field} />
              </FormControl>
              <FormDescription>The author of the book.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Cover Image */}
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <FileInput
                  onChange={(files) => {
                    onChange(files[0]);
                  }}
                  value={value ? [value] : []}
                  {...rest}
                />
              </FormControl>
              <FormDescription>The cover of the book.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Language */}
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
        {/* Page Count */}
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

        <DialogFooter>
          <Button
            aria-label="Edit Book"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <EditIcon className="mr-2" />}
            Edit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserBookManagementEditForm;
