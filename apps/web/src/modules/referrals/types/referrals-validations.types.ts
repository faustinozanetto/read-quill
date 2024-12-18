import { z } from 'zod';

import { REFERRALS_ACTIONS_VALIDATIONS_FORMS } from '../lib/referrals.validations';

/* Attributes */

/* Actions */
export type CreateReferralCodeFormActionData = z.infer<typeof REFERRALS_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type ChangeReferralCodeFormActionData = z.infer<typeof REFERRALS_ACTIONS_VALIDATIONS_FORMS.CHANGE>;
export type EditReferralCodeFormActionData = z.infer<typeof REFERRALS_ACTIONS_VALIDATIONS_FORMS.EDIT>;
