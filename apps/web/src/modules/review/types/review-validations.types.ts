import { z } from 'zod';
import { REVIEW_ACTIONS_VALIDATIONS_FORMS } from '../validations/reviews.validations';

/* Actions */
export type CreateReviewFormActionData = z.infer<typeof REVIEW_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type EditReviewFormActionData = z.infer<typeof REVIEW_ACTIONS_VALIDATIONS_FORMS.EDIT>;
