'use client';

import React from 'react';
import UserLibraryBooksHeaderPublic from '@modules/library/components/books/headers/user-library-books-header-public';
import UserLibraryBooks from '@modules/library/components/books/user-library-books';
import { useUserContext } from '@modules/users/hooks/use-user-context';
import UnLockedAchievements from '@modules/achievements/components/un-locked/un-locked-achievements';
import UnLockedAchievementsHeaderPublic from '@modules/achievements/components/un-locked/headers/un-locked-achievements-header-public';

export const UserProfileDedicatedAchievements: React.FC = () => {
  const user = useUserContext((s) => s.user);

  return (
    <UnLockedAchievements
      userId={user.id}
      onRenderHeader={<UnLockedAchievementsHeaderPublic title={`${user.name}'s Achievements`} />}
    />
  );
};
