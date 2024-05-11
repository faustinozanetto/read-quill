'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import {
  createThreadCommentValidationBaseSchema,
  editThreadCommentValidationBaseSchema,
} from '@modules/community/validations/community-comment.validations';
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

export type CommunityThreadEditCommentFormData = z.infer<typeof editThreadCommentValidationBaseSchema>;

interface CommunityThreadCommentManagementEditFormProps {
  comment: ThreadCommentWithAuthor;
  onSubmit: (data: CommunityThreadEditCommentFormData) => void;
}

const CommunityThreadCommentManagementEditForm: React.FC<CommunityThreadCommentManagementEditFormProps> = (props) => {
  const { comment, onSubmit } = props;

  const form = useForm<CommunityThreadEditCommentFormData>({
    resolver: zodResolver(createThreadCommentValidationBaseSchema),
    mode: 'onBlur',
    defaultValues: {
      content: comment.content,
    },
  });
  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
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
          aria-label="Edit Comment"
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

export default CommunityThreadCommentManagementEditForm;
