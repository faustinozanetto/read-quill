import { z } from 'zod';

import { READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS } from '../lib/read-registries.validations';

/* Attributes */

/* Actions */
export type CreateReadRegistryFormActionData = z.infer<typeof READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS.CREATE>;
export type EditReadRegistryFormActionData = z.infer<typeof READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS.EDIT>;
export type DeleteReadRegistryFormActionData = z.infer<typeof READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS.DELETE>;
export type DeleteReadRegistriesFormActionData = z.infer<
  typeof READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS.DELETE_MULTIPLE
>;
