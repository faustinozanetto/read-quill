'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreateThreadCommentFormActionData } from '@modules/community/types/community-thread-comments-validations.types';
import { THREAD_COMMENT_ACTIONS_VALIDATIONS_FORMS } from '@modules/community/validations/community-comment.validations';

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

interface CommunityThreadWriteCommentFormProps {
  onSubmit: (data: CreateThreadCommentFormActionData) => void;
}

const CommunityThreadWriteCommentForm: React.FC<CommunityThreadWriteCommentFormProps> = (props) => {
  const { onSubmit } = props;

  const form = useForm<CreateThreadCommentFormActionData>({
    resolver: zodResolver(THREAD_COMMENT_ACTIONS_VALIDATIONS_FORMS.CREATE),
    mode: 'onBlur',
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
          aria-label="Post Comment"
          className={cn('sm:ml-auto', isFormLoading && 'cursor-not-allowed')}
          disabled={isFormLoading}
          type="submit"
        >
          {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
          Post
        </Button>
      </form>
    </Form>
  );
};

export default CommunityThreadWriteCommentForm;
