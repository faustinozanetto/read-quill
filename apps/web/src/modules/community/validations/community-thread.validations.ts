import { z } from 'zod';
import { THREAD_ATTACHMENT_ATTRIBUTES_VALIDATIONS } from './community-thread-attachment.validations';

/* Attributes Validations */
const threadIdValidationSchema = z.string({ required_error: 'ThreadId is required!' });

const threadKeywordsValidationSchema = z
  .string({ required_error: 'Please provide the keywords!' })
  .array()
  .min(1, { message: 'Min keywords is 1!' });

const threadContentValidationSchema = z.string().min(1, 'Content is required');

const threadTitleValidationSchema = z
  .string({ required_error: 'Please provide the title!' })
  .max(250, { message: 'Title max characters is 100!' });

const threadVoteTypeValidationSchema = z.enum(['upvote', 'downvote'], { required_error: 'Type is required!' });

const threadFavouriteValidationSchema = z.boolean({ required_error: 'IsFavourite is required!' });

const threadAttachmentValidationSchema = z.object({
  description: THREAD_ATTACHMENT_ATTRIBUTES_VALIDATIONS.description,
  url: z.string().url(),
});

const threadAttachmentFileValidationSchema = z.instanceof(File).refine((file) => file instanceof File, {
  message: 'Must be a File instance',
});

const threadUploadAttachmentValidationSchema = z.object({
  image: threadAttachmentFileValidationSchema,
  description: THREAD_ATTACHMENT_ATTRIBUTES_VALIDATIONS.description,
});

const threadUploadContentValidationSchema = z.object({
  content: threadContentValidationSchema,
  attachments: z.array(threadUploadAttachmentValidationSchema),
});

const threadContentUploadedValidationSchema = z.object({
  content: threadContentValidationSchema,
  attachments: z.array(threadAttachmentValidationSchema).optional(),
});

type ThreadAttributesValidations = {
  title: typeof threadTitleValidationSchema;
  keywords: typeof threadKeywordsValidationSchema;
  content: typeof threadContentValidationSchema;
  id: typeof threadIdValidationSchema;
  voteType: typeof threadVoteTypeValidationSchema;
  favourite: typeof threadFavouriteValidationSchema;
  attachment: typeof threadAttachmentValidationSchema;
  uploadContent: typeof threadUploadContentValidationSchema;
  uploadContentAttachment: typeof threadUploadAttachmentValidationSchema;
  uploadedContent: typeof threadContentUploadedValidationSchema;
};

export const THREAD_ATTRIBUTES_VALIDATIONS: ThreadAttributesValidations = {
  title: threadTitleValidationSchema,
  keywords: threadKeywordsValidationSchema,
  content: threadContentValidationSchema,
  id: threadIdValidationSchema,
  voteType: threadVoteTypeValidationSchema,
  favourite: threadFavouriteValidationSchema,
  attachment: threadAttachmentValidationSchema,
  uploadContent: threadUploadContentValidationSchema,
  uploadContentAttachment: threadUploadAttachmentValidationSchema,
  uploadedContent: threadContentUploadedValidationSchema,
};

const createThreadValidationBaseSchema = z.object({
  title: THREAD_ATTRIBUTES_VALIDATIONS.title,
  keywords: THREAD_ATTRIBUTES_VALIDATIONS.keywords,
  content: THREAD_ATTRIBUTES_VALIDATIONS.uploadContent,
});

const createThreadValidationApiSchema = z.object({
  title: THREAD_ATTRIBUTES_VALIDATIONS.title,
  keywords: THREAD_ATTRIBUTES_VALIDATIONS.keywords,
  content: THREAD_ATTRIBUTES_VALIDATIONS.uploadedContent,
});

const editThreadValidationBaseSchema = z.object({
  title: THREAD_ATTRIBUTES_VALIDATIONS.title,
  content: THREAD_ATTRIBUTES_VALIDATIONS.content,
  keywords: THREAD_ATTRIBUTES_VALIDATIONS.keywords,
});

const editThreadValidationApiSchema = editThreadValidationBaseSchema.extend({
  threadId: THREAD_ATTRIBUTES_VALIDATIONS.id,
});

const deleteThreadValidationApiSchema = z.object({
  threadId: THREAD_ATTRIBUTES_VALIDATIONS.id,
});

const favouriteThreadValidationApiSchema = z.object({
  threadId: THREAD_ATTRIBUTES_VALIDATIONS.id,
  isFavourite: THREAD_ATTRIBUTES_VALIDATIONS.favourite,
});

const voteThreadValidationApiSchema = z.object({
  threadId: THREAD_ATTRIBUTES_VALIDATIONS.id,
  type: THREAD_ATTRIBUTES_VALIDATIONS.voteType,
});

export const THREAD_ACTIONS_VALIDATIONS_API = {
  CREATE: createThreadValidationApiSchema,
  DELETE: deleteThreadValidationApiSchema,
  EDIT: editThreadValidationApiSchema,
  VOTE: voteThreadValidationApiSchema,
  FAVOURITE: favouriteThreadValidationApiSchema,
};

export const THREAD_ACTIONS_VALIDATIONS_FORMS = {
  CREATE: createThreadValidationBaseSchema,
  EDIT: editThreadValidationBaseSchema,
};
