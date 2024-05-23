'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReplyThreadCommentFormActionData } from '@modules/community/types/community-thread-comments-validations.types';
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

interface CommunityThreadReplyCommentFormProps {
  onSubmit: (data: ReplyThreadCommentFormActionData) => void;
}

const CommunityThreadReplyCommentForm: React.FC<CommunityThreadReplyCommentFormProps> = (props) => {
  const { onSubmit } = props;

  const form = useForm<ReplyThreadCommentFormActionData>({
    resolver: zodResolver(THREAD_COMMENT_ACTIONS_VALIDATIONS_FORMS.REPLY),
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
          aria-label="Add Reply"
          className={cn('sm:ml-auto', isFormLoading && 'cursor-not-allowed')}
          disabled={isFormLoading}
          type="submit"
        >
          {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
          Add Reply
        </Button>
      </form>
    </Form>
  );
};

export default CommunityThreadReplyCommentForm;
