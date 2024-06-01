import { z } from 'zod';

import { BOOK_ACTIONS_VALIDATIONS_FORMS, BOOK_ATTRIBUTES_VALIDATIONS } from '../validations/books.validations';

/* Attributes */
export type BookCoverImageUpload = z.infer<typeof BOOK_ATTRIBUTES_VALIDATIONS.coverImageUpload>;

/* Actions */
export type CreateBookFormActionData = z.infer<typeof BOOK_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type EditBookFormActionData = z.infer<typeof BOOK_ACTIONS_VALIDATIONS_FORMS.EDIT>;
