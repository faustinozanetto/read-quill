import React from 'react';
import { Badge, CalendarIcon, ThropyIcon } from '@read-quill/design-system';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';

interface UserAchievementCardProps {
  userAchievement: UserAchievementWithAchievement;
}

const displayCriterias: Record<string, string> = {
  pagesRead: 'Pages Read',
  booksRead: 'Books Read',
};

const UserAchievementCard: React.FC<UserAchievementCardProps> = (props) => {
  const { userAchievement } = props;

  const { achievement, unlockedAt } = userAchievement;

  return (
    <div className="rounded-lg border p-2.5 transition-transform hover:scale-[101%] shadow flex flex-col items-center justify-start text-center">
      <ThropyIcon className="w-14 h-14 sm:w-16 sm:h-16 bg-primary p-2 rounded-lg shadow mb-1" />
      <span className="font-bold uppercase block">{achievement.name}</span>
      <div className="flex gap-2 items-center justify-center mb-2">
        <CalendarIcon className="stroke-current" />
        {unlockedAt ? (
          <span className="font-medium text-sm">
            {new Date(unlockedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
          </span>
        ) : null}
      </div>
      {achievement.criteria ? (
        <ul className="flex gap-1.5 my-auto justify-between items-center">
          {Object.entries(achievement.criteria).map(([criteriaName, criteriaValue]) => (
            <Badge key={criteriaName}>
              {displayCriterias[criteriaName] || criteriaName} {criteriaValue}
            </Badge>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default UserAchievementCard;
