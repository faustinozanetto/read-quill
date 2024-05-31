import { z } from 'zod';

import { USER_SETTINGS_ACTIONS_VALIDATIONS_FORMS } from '../lib/user-settings.validations';

/* Attributes */

/* Actions */
export type DeleteAccountFormActionData = z.infer<typeof USER_SETTINGS_ACTIONS_VALIDATIONS_FORMS.DELETE_ACCOUNT>;
