import React from 'react';
import {
  Badge,
  CalendarIcon,
  ThropyIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@read-quill/design-system';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import { ACHIEVEMENT_DISPLAY_CRITERIAS } from '@modules/achievements/lib/achievement.constants';

interface UserUnLockedAchievementCardProps {
  userAchievement: UserAchievementWithAchievement;
}

const UserUnLockedAchievementCard: React.FC<UserUnLockedAchievementCardProps> = (props) => {
  const { userAchievement } = props;

  const { achievement, unlockedAt } = userAchievement;

  return (
    <div className="rounded-lg border p-2.5 transition-transform hover:scale-[101%] shadow flex flex-col items-center justify-start text-center">
      <ThropyIcon className="w-14 h-14 sm:w-16 sm:h-16 bg-primary p-2 rounded-lg shadow-lg mb-1 stroke-background" />
      <span className="font-bold uppercase block">{achievement.name}</span>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex gap-2 items-center justify-center mb-2">
            <CalendarIcon className="stroke-current" />
            {unlockedAt ? (
              <span className="font-medium text-sm">
                {new Date(unlockedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </span>
            ) : null}
          </TooltipTrigger>
          <TooltipContent>Unlocked Date</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {achievement.criteria ? (
        <ul className="flex gap-1.5 my-auto justify-between items-center">
          {Object.entries(achievement.criteria).map(([criteriaName, criteriaValue]) => (
            <Badge key={criteriaName}>
              {ACHIEVEMENT_DISPLAY_CRITERIAS[criteriaName] || criteriaName} {criteriaValue}
            </Badge>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default UserUnLockedAchievementCard;
