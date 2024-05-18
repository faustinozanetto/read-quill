import { z } from 'zod';

export const createThreadCommentValidationBaseSchema = z.object({
  content: z
    .string({ required_error: 'Please provide the content!' })
    .max(250, { message: 'Content max characters is 250!' }),
});

export const createThreadCommentValidationApiSchema = createThreadCommentValidationBaseSchema.extend({
  threadId: z.string({ required_error: 'ThreadId is required!' }),
});

export const editThreadCommentValidationBaseSchema = z.object({
  content: z
    .string({ required_error: 'Please provide the content!' })
    .max(250, { message: 'Content max characters is 250!' }),
});

export const editThreadCommentValidationApiSchema = editThreadCommentValidationBaseSchema.extend({
  commentId: z.string({ required_error: 'CommentId is required!' }),
});

export const deleteThreadCommentValidationApiSchema = z.object({
  commentId: z.string({ required_error: 'CommentId is required!' }),
});

export const threadCommentReplyValidationBaseSchema = z.object({
  content: z
    .string({ required_error: 'Please provide the content!' })
    .max(250, { message: 'Content max characters is 250!' }),
});

export const threadCommentReplyValidationApichema = threadCommentReplyValidationBaseSchema.extend({
  commentId: z.string({ required_error: 'CommentId is required!' }),
  threadId: z.string({ required_error: 'ThreadId is required!' }),
});
