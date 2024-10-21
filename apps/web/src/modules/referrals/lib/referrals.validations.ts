import { USER_ATTRIBUTES_VALIDATIONS } from '@modules/users/validations/user.validations';
import { z } from 'zod';

/* Attributes Validations */
const referralCodeValidationSchema = z
  .string({ required_error: 'Referral code is required' })
  .min(4, 'Min length is 4!')
  .max(32, 'Max length is 32!');

export const REFERRALS_ATTRIBUTES_VALIDATIONS = {
  referralCode: referralCodeValidationSchema,
};

/* Actions Validations */
const createReferralCodeValidationSchema = z.object({
  userId: USER_ATTRIBUTES_VALIDATIONS.id,
  referralCode: REFERRALS_ATTRIBUTES_VALIDATIONS.referralCode,
});

export const REFERRALS_ACTIONS_VALIDATIONS_API = {
  CREATE: createReferralCodeValidationSchema,
};

export const REFERRALS_ACTIONS_VALIDATIONS_FORMS = {
  CREATE: createReferralCodeValidationSchema,
};