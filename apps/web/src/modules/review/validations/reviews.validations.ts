import { BOOK_ATTRIBUTES_VALIDATIONS } from '@modules/books/validations/books.validations';
import { z } from 'zod';

/* Attributes Validations */
const reviewIdValidationSchema = z.string({ required_error: 'BookId is required!' });
const reviewContentValidationSchema = z
  .string({ required_error: 'Content is required!' })
  .max(2000, 'Content max characters is 2000!');

export const REVIEW_ATTRIBUTES_VALIDATIONS = {
  id: reviewIdValidationSchema,
  content: reviewContentValidationSchema,
};

const createReviewValidationSchemaBase = z.object({
  content: REVIEW_ATTRIBUTES_VALIDATIONS.content,
});

const createReviewValidationSchemaBaseApi = createReviewValidationSchemaBase.extend({
  bookId: BOOK_ATTRIBUTES_VALIDATIONS.id,
});

const editReviewValidationSchemaBase = z.object({
  content: REVIEW_ATTRIBUTES_VALIDATIONS.content,
});

const editReviewValidationSchemaApi = editReviewValidationSchemaBase.extend({
  reviewId: REVIEW_ATTRIBUTES_VALIDATIONS.id,
});

const deleteReviewValidationSchemaBase = z.object({
  reviewId: REVIEW_ATTRIBUTES_VALIDATIONS.id,
});

export const REVIEW_ACTIONS_VALIDATIONS_API = {
  CREATE: createReviewValidationSchemaBaseApi,
  DELETE: deleteReviewValidationSchemaBase,
  EDIT: editReviewValidationSchemaApi,
};

export const REVIEW_ACTIONS_VALIDATIONS_FORMS = {
  CREATE: createReviewValidationSchemaBase,
  DELETE: deleteReviewValidationSchemaBase,
  EDIT: editReviewValidationSchemaBase,
};
