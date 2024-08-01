'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import UnLockedAchievements from './un-locked/un-locked-achievements';
import LockedAchievements from './locked/locked-achievements';
import UnLockedAchievementsHeaderPrivate from './un-locked/headers/un-locked-achievements-header-private';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

const Achievements: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col gap-4">
      <UnLockedAchievements userId={user?.id} onRenderHeader={<UnLockedAchievementsHeaderPrivate />} />
      <LockedAchievements />
    </div>
  );
};

export default Achievements;
