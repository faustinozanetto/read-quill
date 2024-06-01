import { BOOK_ATTRIBUTES_VALIDATIONS } from '@modules/books/validations/books.validations';
import { z } from 'zod';

/* Attributes Validations */
const readRegistryPagesReadValidationSchema = z
  .number({ required_error: 'Pages read is required!' })
  .min(0, { message: 'Pages read min is 0!' });

const readRegistryIdValidationSchema = z.string({ required_error: 'Read Registry ID is required!' });

export const READ_REGISTRY_ATTRIBUTES_VALIDATIONS = {
  pagesRead: readRegistryPagesReadValidationSchema,
  id: readRegistryIdValidationSchema,
};

/* Actions Validations */
const createReadRegistryValidationSchemaBase = z.object({
  bookId: BOOK_ATTRIBUTES_VALIDATIONS.id,
  pagesRead: READ_REGISTRY_ATTRIBUTES_VALIDATIONS.pagesRead,
});

const editReadRegistryValidationSchemaBase = z.object({
  registryId: READ_REGISTRY_ATTRIBUTES_VALIDATIONS.id,
  pagesRead: READ_REGISTRY_ATTRIBUTES_VALIDATIONS.pagesRead,
});

const deleteReadRegistryValidationSchemaBase = z.object({
  registryId: READ_REGISTRY_ATTRIBUTES_VALIDATIONS.id,
});

const deleteReadRegistriesValidationSchemaBase = z.object({
  registryIds: READ_REGISTRY_ATTRIBUTES_VALIDATIONS.id
    .array()
    .min(0, { message: 'RegistryIds must be greather than 0!' }),
});

export const READ_REGISTRY_ACTIONS_VALIDATIONS_API = {
  CREATE: createReadRegistryValidationSchemaBase,
  EDIT: editReadRegistryValidationSchemaBase,
  DELETE: deleteReadRegistryValidationSchemaBase,
  DELETE_MULTIPLE: deleteReadRegistriesValidationSchemaBase,
};

export const READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS = {
  CREATE: createReadRegistryValidationSchemaBase,
  EDIT: editReadRegistryValidationSchemaBase,
  DELETE: deleteReadRegistryValidationSchemaBase,
  DELETE_MULTIPLE: deleteReadRegistriesValidationSchemaBase,
};
