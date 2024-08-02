import { z } from 'zod';

import { EMAIL_ACTIONS_VALIDATIONS_API } from '../lib/emails.validations';

/* Attributes */

/* Actions */
export type SendWelcomeEmailApiActionData = z.infer<typeof EMAIL_ACTIONS_VALIDATIONS_API.SEND_WELCOME>;
