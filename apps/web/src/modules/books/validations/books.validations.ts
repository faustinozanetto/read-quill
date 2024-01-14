import { z } from 'zod';

export const createBookValidationSchema = z.object({
  name: z.string(),
  author: z.string(),
  coverImage: z.string(),
  language: z.string(),
  pageCount: z.number(),
});
