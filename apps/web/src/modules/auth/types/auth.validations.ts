import { z } from 'zod';

/* Attributes Validations */
const authEmailValidationSchema = z.string({ required_error: 'Email is required!' });

export const AUTH_ATTRIBUTES_VALIDATIONS = {
  email: authEmailValidationSchema,
};

/* Actions Validations */
const signInValidationSchemaBase = z.object({
  email: AUTH_ATTRIBUTES_VALIDATIONS.email,
});

export const AUTH_ACTIONS_VALIDATIONS_API = {
  SIGN_IN: signInValidationSchemaBase,
};

export const AUTH_ACTIONS_VALIDATIONS_FORMS = {
  SIGN_IN: signInValidationSchemaBase,
};
