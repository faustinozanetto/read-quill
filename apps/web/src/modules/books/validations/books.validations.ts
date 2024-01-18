import { z } from 'zod';
import { BOOK_MAX_RATING, BOOK_MIN_RATING } from '../lib/book.constants';

/* Create Book */
export const createBookValidationSchemaBase = z
  .object({
    name: z.string({ required_error: 'Name is required!' }),
    author: z.string({ required_error: 'Author is required!' }),
    language: z.string({ required_error: 'Language is required!' }),
    pageCount: z.number({ required_error: 'Page count is required!' }).min(0, 'Page count must be positive!'),
    startedAt: z.string().optional(),
    finishedAt: z.string().optional(),
  })
  .refine(
    (book) => {
      const { startedAt, finishedAt } = book;
      if (startedAt && finishedAt) return new Date(startedAt) < new Date(finishedAt);

      return true;
    },
    { message: 'Finished date must come after started date!' }
  )
  .innerType();

export const createBookValidationSchemaForm = createBookValidationSchemaBase.extend({
  coverImage: z.custom<File>().array().nonempty({ message: 'Cover image is required!' }),
});

export const createBookValidationSchemaAPI = createBookValidationSchemaBase.extend({
  coverImage: z.string(),
});

/* Update Book */
export const editBookValidationSchemaBase = z
  .object({
    name: z.string().optional(),
    author: z.string().optional(),
    language: z.string().optional(),
    pageCount: z.number().min(0, 'Page count must be positive!').optional(),
    startedAt: z.string().optional(),
    finishedAt: z.string().optional(),
  })
  .refine(
    (book) => {
      const { startedAt, finishedAt } = book;
      if (startedAt && finishedAt) return new Date(startedAt) < new Date(finishedAt);

      return true;
    },
    { message: 'Finished date must come after started date!' }
  )
  .innerType();

export const editBookValidationSchemaForm = editBookValidationSchemaBase.extend({
  coverImage: z.custom<File>().array().default([]),
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

export const bookReviewValidationSchemaAPI = bookReviewValidationSchemaForm.extend({
  bookId: z.string(),
});

/* Book Favourite */
export const bookFavouriteValidationSchemaForm = z.object({
  bookId: z.string(),
  isFavourite: z.boolean({ required_error: 'Favourite is required!' }),
});

/* Book Rating */
export const bookRatingValidationSchemaForm = z.object({
  bookId: z.string(),
  rating: z
    .number({ required_error: 'Rating is required!' })
    .min(BOOK_MIN_RATING, `Min rating is ${BOOK_MIN_RATING}!`)
    .max(BOOK_MAX_RATING, `Max rating is ${BOOK_MAX_RATING}!`),
});
