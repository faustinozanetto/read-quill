import { z } from 'zod';
import {
  REVIEW_ACTIONS_VALIDATIONS_API,
  REVIEW_ACTIONS_VALIDATIONS_FORMS,
  REVIEW_ATTRIBUTES_VALIDATIONS,
} from '../validations/reviews.validations';

/* Attributes */
export type LikeReviewType = z.infer<typeof REVIEW_ATTRIBUTES_VALIDATIONS.likeType>;

/* Actions */
export type CreateReviewFormActionData = z.infer<typeof REVIEW_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type EditReviewFormActionData = z.infer<typeof REVIEW_ACTIONS_VALIDATIONS_FORMS.EDIT>;
export type CreateReviewApiActionData = z.infer<typeof REVIEW_ACTIONS_VALIDATIONS_API.CREATE>;
export type DeleteReviewApiActionData = z.infer<typeof REVIEW_ACTIONS_VALIDATIONS_API.DELETE>;
export type EditReviewApiActionData = z.infer<typeof REVIEW_ACTIONS_VALIDATIONS_API.EDIT>;
export type LikeReviewApiActionData = z.infer<typeof REVIEW_ACTIONS_VALIDATIONS_API.LIKE>;
export type RemoveLikeReviewApiActionData = z.infer<typeof REVIEW_ACTIONS_VALIDATIONS_API.DELETE_LIKE>;
