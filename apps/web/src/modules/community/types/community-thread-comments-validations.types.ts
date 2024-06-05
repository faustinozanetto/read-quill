import { z } from 'zod';

import {
  THREAD_COMMENT_ACTIONS_VALIDATIONS_API,
  THREAD_COMMENT_ACTIONS_VALIDATIONS_FORMS,
} from '../validations/community-comment.validations';

/* Attributes */

/* Actions */
export type CreateThreadCommentFormActionData = z.infer<typeof THREAD_COMMENT_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type EditThreadCommentFormActionData = z.infer<typeof THREAD_COMMENT_ACTIONS_VALIDATIONS_FORMS.EDIT>;
export type ReplyThreadCommentFormActionData = z.infer<typeof THREAD_COMMENT_ACTIONS_VALIDATIONS_API.REPLY>;
export type DeleteThreadCommentFormActionData = z.infer<typeof THREAD_COMMENT_ACTIONS_VALIDATIONS_API.DELETE>;
export type EditThreadCommentApiActionData = z.infer<typeof THREAD_COMMENT_ACTIONS_VALIDATIONS_API.EDIT>;
