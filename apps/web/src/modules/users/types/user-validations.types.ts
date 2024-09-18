import { z } from 'zod';

import { USER_ACTIONS_VALIDATIONS_FORMS } from '../validations/user.validations';

/* Attributes */

/* Actions */
export type UserCompleteProfileFormActionData = z.infer<typeof USER_ACTIONS_VALIDATIONS_FORMS.COMPLETE_PROFILE>;
