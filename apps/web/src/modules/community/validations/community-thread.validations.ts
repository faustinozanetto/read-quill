import { z } from 'zod';

const threadAttachmentFileSchema = z.instanceof(File).refine((file) => file instanceof File, {
  message: 'Must be a File instance',
});

const threadAttachmentDescriptionSchema = z.string().min(1, 'Description is required');

// Define the schema for ThreadContentAttachment
const threadContentAttachmentSchema = z.object({
  image: threadAttachmentFileSchema,
  description: threadAttachmentDescriptionSchema,
});

const threadContentSchema = z.string().min(1, 'Content is required');

// Define the schema for ThreadContentLayout
const threadContentLayoutSchema = z.object({
  content: threadContentSchema,
  attachments: z.array(threadContentAttachmentSchema).optional(),
});

export const createThreadValidationBaseSchema = z.object({
  title: z
    .string({ required_error: 'Please provide the title!' })
    .max(250, { message: 'Title max characters is 100!' }),
  content: threadContentLayoutSchema,
  keywords: z
    .string({ required_error: 'Please provide the keywords!' })
    .array()
    .min(1, { message: 'Min keywords is 1!' }),
});

export const createThreadValidationApiSchema = z.object({
  title: z
    .string({ required_error: 'Please provide the title!' })
    .max(250, { message: 'Title max characters is 100!' }),
  content: z.object({
    content: threadContentSchema,
    attachments: z
      .object({
        description: threadAttachmentDescriptionSchema,
        url: z.string().url(),
      })
      .array(),
  }),
  keywords: z
    .string({ required_error: 'Please provide the keywords!' })
    .array()
    .min(1, { message: 'Min keywords is 1!' }),
});

export const editThreadValidationBaseSchema = z.object({
  title: z
    .string({ required_error: 'Please provide the title!' })
    .max(250, { message: 'Title max characters is 100!' }),
  content: z
    .string({ required_error: 'Please provide the content!' })
    .max(1000, { message: 'Content max characters is 1000!' }),
  keywords: z.string({ required_error: 'Please provide the keywords!' }),
});

export const editThreadValidationApiSchema = editThreadValidationBaseSchema.extend({
  threadId: z.string({ required_error: 'ThreadId is required!' }),
});

export const deleteThreadValidationApiSchema = z.object({
  threadId: z.string({ required_error: 'ThreadId is required!' }),
});

export const favouriteThreadValidationSchema = z.object({
  threadId: z.string({ required_error: 'ThreadId is required!' }),
  isFavourite: z.boolean({ required_error: 'IsFavourite is required!' }),
});

export const voteThreadValidationSchema = z.object({
  threadId: z.string({ required_error: 'ThreadId is required!' }),
  type: z.enum(['upvote', 'downvote'], { required_error: 'Type is required!' }),
});
