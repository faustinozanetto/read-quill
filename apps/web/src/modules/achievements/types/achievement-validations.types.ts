import { z } from 'zod';

import { ACHIEVEMENT_ACTIONS_VALIDATIONS_API } from '../lib/achievements.validations';

/* Attributes */

/* Actions */
export type TogglePinnedAchievementApiActionData = z.infer<typeof ACHIEVEMENT_ACTIONS_VALIDATIONS_API.TOGGLE_PINNED>;
