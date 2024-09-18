import { z } from 'zod';

import { AUTH_ACTIONS_VALIDATIONS_FORMS } from './auth.validations';

/* Actions */
export type SignInFormActionData = z.infer<typeof AUTH_ACTIONS_VALIDATIONS_FORMS.SIGN_IN>;
