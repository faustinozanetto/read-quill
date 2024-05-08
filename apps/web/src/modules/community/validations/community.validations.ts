import { z } from 'zod';

export const createThreadCommentValidationBaseSchema = z.object({
  content: z.string({ required_error: 'Content is required!' }).max(250, { message: 'Content max characters is 250!' }),
});

export const createThreadCommentValidationApiSchema = createThreadCommentValidationBaseSchema.extend({
  threadId: z.string({ required_error: 'ThreadId is required!' }),
});
