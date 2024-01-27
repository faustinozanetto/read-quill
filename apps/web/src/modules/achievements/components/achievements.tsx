import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import UnLockedAchievements from './un-locked/un-locked-achievements';
import LockedAchievements from './locked/locked-achievements';

const Achievements: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <UnLockedAchievements />
      <LockedAchievements />
    </div>
  );
};

export default Achievements;
