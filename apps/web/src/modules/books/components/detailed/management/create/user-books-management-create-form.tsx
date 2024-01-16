import React from 'react';
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
  Input,
  BookIcon,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  FileInput,
  cn,
  LoadingIcon,
} from '@read-quill/design-system';
import { createBookValidationSchemaForm } from '@modules/books/validations/books.validations';
import { BOOK_LANGUAGES } from '@modules/books/lib/book.constants';

export type UserBooksManagementCreateFormData = z.infer<typeof createBookValidationSchemaForm>;

interface UserBooksManagementCreateFormProps {
  isBookCoverUploading: boolean;
  onSubmit: (data: UserBooksManagementCreateFormData) => void;
}

const UserBooksManagementCreateForm: React.FC<UserBooksManagementCreateFormProps> = (props) => {
  const { onSubmit, isBookCoverUploading } = props;

  const form = useForm<UserBooksManagementCreateFormData>({
    resolver: zodResolver(createBookValidationSchemaForm),
    mode: 'onBlur',
  });

  const isFormLoading = isBookCoverUploading || form.formState.isSubmitting;

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
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
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
            aria-label="Create Book"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <BookIcon className="mr-2" />}
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserBooksManagementCreateForm;
