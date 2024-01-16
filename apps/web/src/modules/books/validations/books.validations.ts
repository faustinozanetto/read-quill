import { z } from 'zod';

/* Create Book */
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

/* Update Book */
export const editBookValidationSchemaBase = z.object({
  name: z.string().optional(),
  author: z.string().optional(),
  language: z.string().optional(),
  pageCount: z.number().min(0, 'Page count must be positive!').optional(),
});

export const editBookValidationSchemaForm = editBookValidationSchemaBase.extend({
  coverImage: z.custom<File>().optional(),
});

export const editBookValidationSchemaAPI = editBookValidationSchemaBase.extend({
  bookId: z.string(),
  coverImage: z.string().optional(),
});

/* Delete Book */
export const deleteBookValidationSchemaForm = z.object({
  bookId: z.string({ required_error: 'Book ID is required!' }),
});

/* Book Review */
export const bookReviewValidationSchemaForm = z.object({
  review: z.string({ required_error: 'Review is required!' }).max(2000, 'Review max characters is 2000!'),
});

/* Book Review */
export const bookFavouriteValidationSchemaForm = z.object({
  bookId: z.string(),
  isFavourite: z.boolean({ required_error: 'Favourite is required!' }),
});

export const bookReviewValidationSchemaAPI = bookReviewValidationSchemaForm.extend({
  bookId: z.string(),
});
