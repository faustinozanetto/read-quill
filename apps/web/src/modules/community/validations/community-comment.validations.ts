import { z } from 'zod';
import { THREAD_ATTRIBUTES_VALIDATIONS } from './community-thread.validations';

/* Atributes Validation */
const threadCommentContentValidationSchema = z
  .string({ required_error: 'Please provide the content!' })
  .max(250, { message: 'Content max characters is 250!' });

const threadCommentIdValidationSchema = z.string({ required_error: 'ThreadId is required!' });

type ThreadCommentAttributesValidations = {
  id: typeof threadCommentIdValidationSchema;
  content: typeof threadCommentContentValidationSchema;
};

export const THREAD_COMMENT_ATTRIBUTES_VALIDATIONS: ThreadCommentAttributesValidations = {
  id: threadCommentIdValidationSchema,
  content: threadCommentContentValidationSchema,
};

/* Actions Validations */
const createThreadCommentValidationBaseSchema = z.object({
  content: THREAD_COMMENT_ATTRIBUTES_VALIDATIONS.content,
});

const createThreadCommentValidationApiSchema = createThreadCommentValidationBaseSchema.extend({
  threadId: THREAD_ATTRIBUTES_VALIDATIONS.id,
});

const editThreadCommentValidationBaseSchema = z.object({
  content: THREAD_COMMENT_ATTRIBUTES_VALIDATIONS.content,
});

const editThreadCommentValidationApiSchema = editThreadCommentValidationBaseSchema.extend({
  commentId: THREAD_COMMENT_ATTRIBUTES_VALIDATIONS.id,
});

const deleteThreadCommentValidationApiSchema = z.object({
  commentId: THREAD_COMMENT_ATTRIBUTES_VALIDATIONS.id,
});

const threadCommentReplyValidationBaseSchema = z.object({
  content: THREAD_COMMENT_ATTRIBUTES_VALIDATIONS.content,
});

const threadCommentReplyValidationApichema = threadCommentReplyValidationBaseSchema.extend({
  commentId: THREAD_COMMENT_ATTRIBUTES_VALIDATIONS.id,
  threadId: THREAD_ATTRIBUTES_VALIDATIONS.id,
});

export const THREAD_COMMENT_ACTIONS_VALIDATIONS_API = {
  CREATE: createThreadCommentValidationApiSchema,
  DELETE: deleteThreadCommentValidationApiSchema,
  EDIT: editThreadCommentValidationApiSchema,
  REPLY: threadCommentReplyValidationApichema,
};

export const THREAD_COMMENT_ACTIONS_VALIDATIONS_FORMS = {
  CREATE: createThreadCommentValidationBaseSchema,
  DELETE: deleteThreadCommentValidationApiSchema,
  EDIT: editThreadCommentValidationBaseSchema,
  REPLY: threadCommentReplyValidationBaseSchema,
};
