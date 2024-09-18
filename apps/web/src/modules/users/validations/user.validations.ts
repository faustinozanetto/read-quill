import { z } from 'zod';

/* Attributes Validations */
const userNameValidationSchema = z.string({ required_error: 'Name is required!' });

export const USER_ATTRIBUTES_VALIDATIONS = {
  name: userNameValidationSchema,
};

/* Actions Validations */
const userCompleteProfileValidationSchemaBase = z.object({
  name: USER_ATTRIBUTES_VALIDATIONS.name,
});

export const USER_ACTIONS_VALIDATIONS_API = {
  COMPLETE_PROFILE: userCompleteProfileValidationSchemaBase,
};

export const USER_ACTIONS_VALIDATIONS_FORMS = {
  COMPLETE_PROFILE: userCompleteProfileValidationSchemaBase,
};
