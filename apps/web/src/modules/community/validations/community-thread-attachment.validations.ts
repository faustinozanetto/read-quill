import { z } from 'zod';

/* Attributes Validations */
const threadAttachmentDescriptionValidationSchema = z.string({ required_error: 'Description is required!' });

const threadAttachmentIdValidationScehma = z.string({ required_error: 'AttachmentId is required!' });

type ThreadAttachmentAttributesValidations = {
  id: typeof threadAttachmentIdValidationScehma;
  description: typeof threadAttachmentDescriptionValidationSchema;
};

export const THREAD_ATTACHMENT_ATTRIBUTES_VALIDATIONS: ThreadAttachmentAttributesValidations = {
  id: threadAttachmentIdValidationScehma,
  description: threadAttachmentDescriptionValidationSchema,
};

/* Actions Validations */
const deleteThreadAttachmentValidationBaseSchema = z.object({
  attachmentId: threadAttachmentIdValidationScehma,
});

const editThreadAttachmentValidationBaseSchema = z.object({
  description: THREAD_ATTACHMENT_ATTRIBUTES_VALIDATIONS.description,
});

const editThreadAttachmentValidationApiSchema = editThreadAttachmentValidationBaseSchema.extend({
  attachmentId: THREAD_ATTACHMENT_ATTRIBUTES_VALIDATIONS.id,
});

export const THREAD_ATTACHMENT_ACTIONS_VALIDATIONS_API = {
  DELETE: deleteThreadAttachmentValidationBaseSchema,
  EDIT: editThreadAttachmentValidationApiSchema,
};

export const THREAD_ATTACHMENT_ACTIONS_VALIDATIONS_FORMS = {
  DELETE: deleteThreadAttachmentValidationBaseSchema,
  EDIT: editThreadAttachmentValidationBaseSchema,
};
