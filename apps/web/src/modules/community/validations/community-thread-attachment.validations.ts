import { z } from 'zod';

/* Attributes Validations */
const threadAttachmentDescriptionValidationSchema = z
  .string({ required_error: 'Description is required!' })
  .min(1, { message: 'Description min lenght is 1!' });

const threadAttachmentIdValidationScehma = z.string({ required_error: 'AttachmentId is required!' });

export const THREAD_ATTACHMENT_ATTRIBUTES_VALIDATIONS = {
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
