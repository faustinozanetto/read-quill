import { z } from 'zod';

import { BOOK_ACTIONS_VALIDATIONS_FORMS } from '../validations/books.validations';

/* Attributes */

/* Actions */
export type CreateBookFormActionData = z.infer<typeof BOOK_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type EditBookFormActionData = z.infer<typeof BOOK_ACTIONS_VALIDATIONS_FORMS.EDIT>;
export type CreateBookReviewFormActionData = z.infer<typeof BOOK_ACTIONS_VALIDATIONS_FORMS.CREATE_REVIEW>;
export type EditBookReviewFormActionData = z.infer<typeof BOOK_ACTIONS_VALIDATIONS_FORMS.EDIT_REVIEW>;
