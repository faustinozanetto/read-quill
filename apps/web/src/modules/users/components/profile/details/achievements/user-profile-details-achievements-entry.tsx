import React from 'react';

import {
  Badge,
  Skeleton,
  ThropyIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@read-quill/design-system';
import { AchievementWithUserAchievement } from '@modules/achievements/types/achievements.types';
import { ACHIEVEMENT_DISPLAY_CRITERIAS } from '@modules/achievements/lib/achievement.constants';

interface UserProfileDetailsAchievementEntryProps {
  pinnedAchievement: AchievementWithUserAchievement;
}

const UserProfileDetailsAchievementEntry: React.FC<UserProfileDetailsAchievementEntryProps> = (props) => {
  const { pinnedAchievement } = props;

  const criterias = pinnedAchievement.criteria
    ? Object.entries(pinnedAchievement.criteria).reduce((acc, [criteriaName, criteriaValue]) => {
        if (acc === '') return `${criteriaValue} ${ACHIEVEMENT_DISPLAY_CRITERIAS[criteriaName] || criteriaName}`;

        return `${acc} | ${criteriaValue} ${ACHIEVEMENT_DISPLAY_CRITERIAS[criteriaName] || criteriaName}`;
      }, '')
    : '';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge>
            <ThropyIcon className="mr-2" /> {pinnedAchievement.name}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{criterias}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserProfileDetailsAchievementEntry;
