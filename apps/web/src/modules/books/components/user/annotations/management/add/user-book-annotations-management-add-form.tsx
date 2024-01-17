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
  Textarea,
  PencilIcon,
  cn,
  LoadingIcon,
  Input,
} from '@read-quill/design-system';
import { createBookAnnotationValidationSchemaBase } from '@modules/books/validations/books.validations';

export type UserBookAnnotationManagementAddFormData = z.infer<typeof createBookAnnotationValidationSchemaBase>;

interface UserBookAnnotationManagementAddFormProps {
  onSubmit: (data: UserBookAnnotationManagementAddFormData) => void;
}

const UserBookAnnotationManagementAddForm: React.FC<UserBookAnnotationManagementAddFormProps> = (props) => {
  const { onSubmit } = props;

  const form = useForm<UserBookAnnotationManagementAddFormData>({
    resolver: zodResolver(createBookAnnotationValidationSchemaBase),
    mode: 'onBlur',
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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

        <DialogFooter>
          <Button
            aria-label="Add Annotation"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
            Add
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserBookAnnotationManagementAddForm;
