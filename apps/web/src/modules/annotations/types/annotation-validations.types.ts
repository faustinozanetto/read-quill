import { z } from 'zod';

import {
  ANNOTATION_ACTIONS_VALIDATIONS_API,
  ANNOTATION_ACTIONS_VALIDATIONS_FORMS,
} from '../lib/annotations.validations';

/* Attributes */

/* Actions */
export type CreateAnnotationFormActionData = z.infer<typeof ANNOTATION_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type CreateAnnotationApiActionData = z.infer<typeof ANNOTATION_ACTIONS_VALIDATIONS_API.CREATE>;
export type EditAnnotationFormActionData = z.infer<typeof ANNOTATION_ACTIONS_VALIDATIONS_FORMS.EDIT>;
export type EditAnnotationApiActionData = z.infer<typeof ANNOTATION_ACTIONS_VALIDATIONS_API.EDIT>;
export type DeleteAnnotationApiActionData = z.infer<typeof ANNOTATION_ACTIONS_VALIDATIONS_API.DELETE>;
