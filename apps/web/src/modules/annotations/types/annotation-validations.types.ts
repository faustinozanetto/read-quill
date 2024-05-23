import { z } from 'zod';

import { ANNOTATION_ACTIONS_VALIDATIONS_FORMS } from '../lib/annotations.validations';

/* Attributes */

/* Actions */
export type CreateAnnotationFormActionData = z.infer<typeof ANNOTATION_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type EditAnnotationFormActionData = z.infer<typeof ANNOTATION_ACTIONS_VALIDATIONS_FORMS.EDIT>;
