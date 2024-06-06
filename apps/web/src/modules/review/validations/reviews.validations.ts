import { BOOK_ATTRIBUTES_VALIDATIONS } from '@modules/books/validations/books.validations';
import { z } from 'zod';

/* Attributes Validations */
const reviewIdValidationSchema = z.string({ required_error: 'ReviewId is required!' });
const reviewContentValidationSchema = z
  .string({ required_error: 'Content is required!' })
  .max(2000, 'Content max characters is 2000!');
const reviewLikeTypeValidationSchema = z.enum(['like', 'dislike'], { required_error: 'Like type is required!' });

export const REVIEW_ATTRIBUTES_VALIDATIONS = {
  id: reviewIdValidationSchema,
  content: reviewContentValidationSchema,
  likeType: reviewLikeTypeValidationSchema,
};

const createReviewValidationSchemaBase = z.object({
  content: REVIEW_ATTRIBUTES_VALIDATIONS.content,
});

const createReviewValidationSchemaApi = createReviewValidationSchemaBase.extend({
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

const likeReviewValidationSchemaBase = z.object({
  reviewId: REVIEW_ATTRIBUTES_VALIDATIONS.id,
  likeType: REVIEW_ATTRIBUTES_VALIDATIONS.likeType,
});

const removelikeReviewValidationSchemaBase = z.object({
  reviewId: REVIEW_ATTRIBUTES_VALIDATIONS.id,
});

export const REVIEW_ACTIONS_VALIDATIONS_API = {
  CREATE: createReviewValidationSchemaApi,
  DELETE: deleteReviewValidationSchemaBase,
  EDIT: editReviewValidationSchemaApi,
  LIKE: likeReviewValidationSchemaBase,
  DELETE_LIKE: removelikeReviewValidationSchemaBase,
};

export const REVIEW_ACTIONS_VALIDATIONS_FORMS = {
  CREATE: createReviewValidationSchemaBase,
  DELETE: deleteReviewValidationSchemaBase,
  EDIT: editReviewValidationSchemaBase,
  LIKE: likeReviewValidationSchemaBase,
  DELETE_LIKE: removelikeReviewValidationSchemaBase,
};
