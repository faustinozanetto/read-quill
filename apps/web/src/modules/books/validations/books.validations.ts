import { z } from 'zod';

export const createBookValidationSchemaBase = z.object({
  name: z.string({ required_error: 'Name is required!' }),
  author: z.string({ required_error: 'Author is required!' }),
  language: z.string({ required_error: 'Language is required!' }),
  pageCount: z.number({ required_error: 'Page count is required!' }).min(0, 'Page count must be positive!'),
});

export const createBookValidationSchemaForm = createBookValidationSchemaBase.extend({
  coverImage: z.custom<File>(),
});

export const createBookValidationSchemaAPI = createBookValidationSchemaBase.extend({
  coverImage: z.string(),
});

export const bookReviewValidationSchemaForm = z.object({
  review: z.string({ required_error: 'Review is required!' }).max(500, 'Review max characters is 500!'),
});

export const bookReviewValidationSchemaAPI = bookReviewValidationSchemaForm.extend({
  bookId: z.string(),
});
