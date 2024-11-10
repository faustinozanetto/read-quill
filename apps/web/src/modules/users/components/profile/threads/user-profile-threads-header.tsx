import React from 'react';
import Link from 'next/link';

import { Button, ManageIcon } from '@read-quill/design-system';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import { useUserContext } from '@modules/users/hooks/use-user-context';

const UserProfileThreadsHeader: React.FC = () => {
  const { user: authUser } = useAuthContext();
  const { user } = useUserContext((s) => s);

  const isProfileOwner = Boolean(authUser && user.email === authUser.email);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:items-center sm:flex-row sm:justify-between gap-2">
        <h2 className="text-2xl font-bold">💬 Threads</h2>

        {isProfileOwner ? (
          <Button aria-label="Manage Containers" asChild className="md:w-auto" size="sm" variant="outline">
            <Link className="md:w-auto" href="/books">
              <ManageIcon className="mr-2" />
              Manage
            </Link>
          </Button>
        ) : null}
      </div>
      <p>
        Browse through the threads this user has participated in. Engage with their discussions and insights on various
        topics.
      </p>
    </div>
  );
};

export default UserProfileThreadsHeader;
