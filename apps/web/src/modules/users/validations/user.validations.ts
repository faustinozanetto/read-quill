import { z } from 'zod';

/* Attributes Validations */
const userNameValidationSchema = z.string({ required_error: 'Name is required!' });
const userAvatarImageUploadValidationSchema = z
  .instanceof(File)
  .refine((file) => file instanceof File, {
    message: 'Must be a File instance',
  })
  .array()
  .min(1, { message: 'Avatar image is required!' });
const userAvatarImageIdValidationSchema = z.string({ required_error: 'Image Id is required!' });

export const USER_ATTRIBUTES_VALIDATIONS = {
  name: userNameValidationSchema,
  avatarImageUpload: userAvatarImageUploadValidationSchema,
  imageId: userAvatarImageIdValidationSchema,
};

/* Actions Validations */
const userCompleteProfileValidationSchemaBase = z.object({
  name: USER_ATTRIBUTES_VALIDATIONS.name,
});

const userUpdateAvatarValidationSchemaForm = z.object({
  avatarImage: USER_ATTRIBUTES_VALIDATIONS.avatarImageUpload,
});

const userUpdateAvatarValidationSchemaApi = z.object({
  imageId: USER_ATTRIBUTES_VALIDATIONS.imageId,
});

export const USER_ACTIONS_VALIDATIONS_API = {
  COMPLETE_PROFILE: userCompleteProfileValidationSchemaBase,
  UPDATE_AVATAR: userUpdateAvatarValidationSchemaApi,
};

export const USER_ACTIONS_VALIDATIONS_FORMS = {
  COMPLETE_PROFILE: userCompleteProfileValidationSchemaBase,
  UPDATE_AVATAR: userUpdateAvatarValidationSchemaForm,
};
