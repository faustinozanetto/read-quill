import React from 'react';
import { Badge, ThropyIcon } from '@read-quill/design-system';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';
import { ACHIEVEMENT_DISPLAY_CRITERIAS } from '@modules/achievements/lib/achievement.constants';

/**
 * Props for the UserLockedAchievementCard component.
 */
interface UserLockedAchievementCardProps {
  /**
   * Information about the locked achievement associated with the user's progress.
   */
  userAchievement: AchievementWithProgress;
}

const UserLockedAchievementCard: React.FC<UserLockedAchievementCardProps> = (props) => {
  const { userAchievement } = props;

  return (
    <div className="rounded-lg border p-2.5 shadow flex flex-col items-center justify-start text-center relative">
      <div className="absolute top-2 right-2 bg-card p-1.5 rounded-lg shadow border aspect-square font-bold flex text-sm items-center justify-center size-11">
        {userAchievement.completionPercentage}%
      </div>
      <ThropyIcon className="size-14 sm:w-16 sm:h-16 bg-primary p-2 rounded-lg shadow mb-1 stroke-accent" />
      <span className="font-bold uppercase block">{userAchievement.name}</span>
      {userAchievement.criteria ? (
        <ul className="flex flex-wrap gap-1.5 my-auto justify-center items-center">
          {Object.entries(userAchievement.criteria).map(([criteriaName, criteriaValue]) => (
            <Badge key={criteriaName} className="text-pretty">
              {ACHIEVEMENT_DISPLAY_CRITERIAS[criteriaName] || criteriaName} {criteriaValue}
            </Badge>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default UserLockedAchievementCard;
