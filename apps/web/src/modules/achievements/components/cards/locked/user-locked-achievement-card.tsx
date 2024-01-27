import React from 'react';
import { Badge, ThropyIcon } from '@read-quill/design-system';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';

interface UserLockedAchievementCardProps {
  userAchievement: AchievementWithProgress;
}

const displayCriterias: Record<string, string> = {
  pagesRead: 'Pages Read',
  booksRead: 'Books Read',
};

const UserLockedAchievementCard: React.FC<UserLockedAchievementCardProps> = (props) => {
  const { userAchievement } = props;

  return (
    <div className="rounded-lg border p-2.5 shadow flex flex-col items-center justify-start text-center relative">
      <div className="absolute top-2 right-2 bg-primary p-1.5 rounded-lg shadow border aspect-square font-bold flex text-sm items-center justify-center">
        {userAchievement.completionPercentage}%
      </div>

      <ThropyIcon className="w-14 h-14 sm:w-16 sm:h-16 bg-primary p-2 rounded-lg shadow mb-1" />
      <span className="font-bold uppercase block">{userAchievement.name}</span>
      {userAchievement.criteria ? (
        <ul className="flex gap-1.5 my-auto justify-between items-center">
          {Object.entries(userAchievement.criteria).map(([criteriaName, criteriaValue]) => (
            <Badge key={criteriaName}>
              {displayCriterias[criteriaName] || criteriaName} {criteriaValue}
            </Badge>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default UserLockedAchievementCard;