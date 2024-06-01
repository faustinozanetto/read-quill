import { z } from 'zod';
import { BOOK_MAX_RATING, BOOK_MIN_RATING } from '../lib/book.constants';

/* Attributes Validations */
const bookIdValidationSchema = z.string({ required_error: 'BookId is required!' });
const bookNameValidationSchema = z.string({ required_error: 'Name is required!' });
const bookAuthorValidationSchema = z.string({ required_error: 'Author is required!' });
const bookLanguageValidationSchema = z.string({ required_error: 'Language is required!' });
const bookPageCountValidationSchema = z
  .number({ required_error: 'Page count is required!' })
  .min(0, 'Page count must be positive!');
const bookStartedAtValidationSchema = z.string().optional();
const bookFinishedAtValidationSchema = z.string().optional();
const bookCoverImageUploadValidationSchema = z
  .instanceof(File)
  .refine((file) => file instanceof File, {
    message: 'Must be a File instance',
  })
  .array()
  .min(1, { message: 'Cover image is required!' });
const bookCoverImageIdValidationSchema = z.string({ required_error: 'Image Id is required!' });
const bookRatingValidationSchema = z
  .number({ required_error: 'Rating is required!' })
  .min(BOOK_MIN_RATING, `Min rating is ${BOOK_MIN_RATING}!`)
  .max(BOOK_MAX_RATING, `Max rating is ${BOOK_MAX_RATING}!`);
const bookFavouriteValidationSchema = z.boolean({ required_error: 'Favourite is required!' });

type BookAttributesValidations = {
  name: typeof bookNameValidationSchema;
  author: typeof bookAuthorValidationSchema;
  language: typeof bookLanguageValidationSchema;
  id: typeof bookIdValidationSchema;
  pageCount: typeof bookPageCountValidationSchema;
  startedAt: typeof bookFinishedAtValidationSchema;
  finishedAt: typeof bookFinishedAtValidationSchema;
  coverImageUpload: typeof bookCoverImageUploadValidationSchema;
  imageId: typeof bookCoverImageIdValidationSchema;
  rating: typeof bookRatingValidationSchema;
  favourite: typeof bookFavouriteValidationSchema;
};

export const BOOK_ATTRIBUTES_VALIDATIONS: BookAttributesValidations = {
  id: bookIdValidationSchema,
  name: bookNameValidationSchema,
  author: bookAuthorValidationSchema,
  language: bookLanguageValidationSchema,
  pageCount: bookPageCountValidationSchema,
  startedAt: bookStartedAtValidationSchema,
  finishedAt: bookFinishedAtValidationSchema,
  coverImageUpload: bookCoverImageUploadValidationSchema,
  imageId: bookCoverImageIdValidationSchema,

  rating: bookRatingValidationSchema,
  favourite: bookFavouriteValidationSchema,
};

/* Actions Validations */
const createBookValidationSchemaBase = z
  .object({
    name: BOOK_ATTRIBUTES_VALIDATIONS.name,
    author: BOOK_ATTRIBUTES_VALIDATIONS.author,
    language: BOOK_ATTRIBUTES_VALIDATIONS.language,
    pageCount: BOOK_ATTRIBUTES_VALIDATIONS.pageCount,
    startedAt: BOOK_ATTRIBUTES_VALIDATIONS.startedAt,
    finishedAt: BOOK_ATTRIBUTES_VALIDATIONS.finishedAt,
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

const createBookValidationSchemaForm = createBookValidationSchemaBase.extend({
  coverImage: BOOK_ATTRIBUTES_VALIDATIONS.coverImageUpload,
});

const createBookValidationSchemaApi = createBookValidationSchemaBase.extend({
  imageId: BOOK_ATTRIBUTES_VALIDATIONS.imageId,
});

const editBookValidationSchemaBase = z
  .object({
    name: BOOK_ATTRIBUTES_VALIDATIONS.name,
    author: BOOK_ATTRIBUTES_VALIDATIONS.author,
    language: BOOK_ATTRIBUTES_VALIDATIONS.language,
    pageCount: BOOK_ATTRIBUTES_VALIDATIONS.pageCount,
    startedAt: BOOK_ATTRIBUTES_VALIDATIONS.startedAt,
    finishedAt: BOOK_ATTRIBUTES_VALIDATIONS.finishedAt,
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

const editBookValidationSchemaForm = editBookValidationSchemaBase.extend({
  coverImage: BOOK_ATTRIBUTES_VALIDATIONS.coverImageUpload.optional(),
});

const editBookValidationSchemaApi = editBookValidationSchemaBase.extend({
  bookId: BOOK_ATTRIBUTES_VALIDATIONS.id,
  imageId: BOOK_ATTRIBUTES_VALIDATIONS.imageId.optional(),
});

const deleteBookValidationSchemaBase = z.object({
  bookId: BOOK_ATTRIBUTES_VALIDATIONS.id,
});

const bookFavouriteValidationSchemaBase = z.object({
  bookId: BOOK_ATTRIBUTES_VALIDATIONS.id,
  isFavourite: BOOK_ATTRIBUTES_VALIDATIONS.favourite,
});

const bookRatingValidationSchemaBase = z.object({
  bookId: BOOK_ATTRIBUTES_VALIDATIONS.id,
  rating: BOOK_ATTRIBUTES_VALIDATIONS.rating,
});

export const BOOK_ACTIONS_VALIDATIONS_API = {
  CREATE: createBookValidationSchemaApi,
  DELETE: deleteBookValidationSchemaBase,
  EDIT: editBookValidationSchemaApi,
  RATING: bookRatingValidationSchemaBase,
  FAVOURITE: bookFavouriteValidationSchemaBase,
};

export const BOOK_ACTIONS_VALIDATIONS_FORMS = {
  CREATE: createBookValidationSchemaForm,
  DELETE: deleteBookValidationSchemaBase,
  EDIT: editBookValidationSchemaForm,
  RATING: bookRatingValidationSchemaBase,
  FAVOURITE: bookFavouriteValidationSchemaBase,
};
