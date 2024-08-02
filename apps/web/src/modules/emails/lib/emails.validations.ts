import { z } from 'zod';

/* Attributes Validations */
const emailTargetValidationSchema = z
  .string({ required_error: 'Target is required!' })
  .email({ message: 'Invalid email!' });
const emailSubjectValidationSchema = z.string({ required_error: 'Subject is required!' });

export const EMAIL_ATTRIBUTES_VALIDATIONS = {
  target: emailTargetValidationSchema,
  subject: emailSubjectValidationSchema,
};

/* Actions Validations */
const sendEmailValidationSchema = z.object({
  target: EMAIL_ATTRIBUTES_VALIDATIONS.target,
  subject: EMAIL_ATTRIBUTES_VALIDATIONS.subject,
});

const sendWelcomeEmailValidationSchema = sendEmailValidationSchema.extend({
  completeName: z.string({ message: 'Complete name is required!' }),
});

export const EMAIL_ACTIONS_VALIDATIONS_API = {
  SEND_WELCOME: sendWelcomeEmailValidationSchema,
};

export const EMAIL_ACTIONS_VALIDATIONS_FORMS = {
  SEND_WELCOME: sendWelcomeEmailValidationSchema,
};
