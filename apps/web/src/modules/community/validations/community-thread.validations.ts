import { z } from 'zod';

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
