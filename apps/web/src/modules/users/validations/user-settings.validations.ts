import { z } from 'zod';

/* Attributes Validations */
const accountEmailValidationSchema = z.string({ required_error: 'Email is required!' });
const deleteConfirmationValidationSchema = z.literal('delete-account', {
  errorMap: () => ({ message: 'You must type "delete-account" to confirm' }),
});

export const USER_SETTINGS_ATTRIBUTES_VALIDATIONS = {
  accountEmail: accountEmailValidationSchema,
  deleteConfirmation: deleteConfirmationValidationSchema,
};

/* Actions Validations */
const deleteUserAccountValidationSchemaBase = z.object({
  accountEmail: USER_SETTINGS_ATTRIBUTES_VALIDATIONS.accountEmail,
  deleteConfirmation: USER_SETTINGS_ATTRIBUTES_VALIDATIONS.deleteConfirmation,
});

export const USER_SETTINGS_ACTIONS_VALIDATIONS_API = {
  DELETE_ACCOUNT: deleteUserAccountValidationSchemaBase,
};

export const USER_SETTINGS_ACTIONS_VALIDATIONS_FORMS = {
  DELETE_ACCOUNT: deleteUserAccountValidationSchemaBase,
};
