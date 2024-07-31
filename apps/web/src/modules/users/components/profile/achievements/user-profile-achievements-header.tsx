import React from 'react';
import Link from 'next/link';

import { Button, ManageIcon } from '@read-quill/design-system';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import { useUserContext } from '@modules/users/hooks/use-user-context';

const UserProfileAchievementsHeader: React.FC = () => {
  const { user: authUser } = useAuthContext();
  const { user } = useUserContext((s) => s);

  const isProfileOwner = Boolean(authUser && user.email === authUser.email);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:items-center sm:flex-row sm:justify-between gap-2">
        <h2 className="text-2xl font-bold">Achievements</h2>

        {isProfileOwner ? (
          <Button aria-label="Manage Achievements" asChild className="md:w-auto" size="sm" variant="outline">
            <Link className="md:w-auto" title="Manage Achievements" href="/achievements">
              <ManageIcon className="mr-2" />
              Manage
            </Link>
          </Button>
        ) : null}
      </div>

      <p>
        Explore the milestones and accomplishments that showcase this user's journey and progress. Celebrate their
        achievements and see how far they've come.
      </p>
    </div>
  );
};

export default UserProfileAchievementsHeader;
