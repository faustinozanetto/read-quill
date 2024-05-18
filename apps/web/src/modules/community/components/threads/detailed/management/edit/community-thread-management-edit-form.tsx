'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { editThreadValidationBaseSchema } from '@modules/community/validations/community-thread.validations';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  LoadingIcon,
  PencilIcon,
  Textarea,
  cn,
} from '@read-quill/design-system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type CommunityThreadEditFormData = z.infer<typeof editThreadValidationBaseSchema>;

interface CommunityThreadManagementEditFormProps {
  thread: ThreadWithDetails;
  onSubmit: (data: CommunityThreadEditFormData) => void;
}

const CommunityThreadManagementEditForm: React.FC<CommunityThreadManagementEditFormProps> = (props) => {
  const { thread, onSubmit } = props;

  const form = useForm<CommunityThreadEditFormData>({
    resolver: zodResolver(editThreadValidationBaseSchema),
    mode: 'onBlur',
    defaultValues: {
      title: thread.title,
      content: thread.content,
      keywords: thread.keywords,
    },
  });
  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea placeholder="Treasure Island" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Treasure Island" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          aria-label="Edit Thread"
          className={cn('sm:ml-auto', isFormLoading && 'cursor-not-allowed')}
          disabled={isFormLoading}
          type="submit"
        >
          {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
          Edit
        </Button>
      </form>
    </Form>
  );
};

export default CommunityThreadManagementEditForm;
