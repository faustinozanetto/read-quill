import { z } from 'zod';

/* Attributes Validations */
const achievementIdValidationSchema = z.string({ required_error: 'AchievementId is required!' });

type AchievementAttributesValidations = {
  id: typeof achievementIdValidationSchema;
};

export const ANNOATION_ATTRIBUTES_VALIDATIONS: AchievementAttributesValidations = {
  id: achievementIdValidationSchema,
};

/* Actions Validations */
const togglePinnedAchievementValidationSchemaBase = z.object({
  achievementId: ANNOATION_ATTRIBUTES_VALIDATIONS.id,
});

export const ACHIEVEMENT_ACTIONS_VALIDATIONS_API = {
  TOGGLE_PINNED: togglePinnedAchievementValidationSchemaBase,
};

export const ACHIEVEMENT_ACTIONS_VALIDATIONS_FORMS = {
  TOGGLE_PINNED: togglePinnedAchievementValidationSchemaBase,
};
