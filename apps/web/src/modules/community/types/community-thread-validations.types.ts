import { z } from 'zod';
import {
  THREAD_ACTIONS_VALIDATIONS_API,
  THREAD_ACTIONS_VALIDATIONS_FORMS,
  THREAD_ATTRIBUTES_VALIDATIONS,
} from '../validations/community-thread.validations';

/* Attributes */
export type ThreadUploadContent = z.infer<typeof THREAD_ATTRIBUTES_VALIDATIONS.uploadContent>;
export type ThreadUploadContentAttachment = z.infer<typeof THREAD_ATTRIBUTES_VALIDATIONS.uploadContentAttachment>;

export type VoteThreadType = z.infer<typeof THREAD_ATTRIBUTES_VALIDATIONS.voteType>;
export type VoteThreadAction = z.infer<typeof THREAD_ACTIONS_VALIDATIONS_API.VOTE>;

/* Actions */
export type CreateThreadFormActionData = z.infer<typeof THREAD_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type EditThreadFormActionData = z.infer<typeof THREAD_ACTIONS_VALIDATIONS_FORMS.EDIT>;
export type VoteThreadActionData = z.infer<typeof THREAD_ACTIONS_VALIDATIONS_API.VOTE>;
export type DeleteThreadApiActionData = z.infer<typeof THREAD_ACTIONS_VALIDATIONS_API.DELETE>;
