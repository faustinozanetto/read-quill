import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button, ManageIcon, Skeleton } from '@read-quill/design-system';
import { useUserProfileStore } from '@modules/users/state/user-profile.slice';

const UserProfileThreadsHeader: React.FC = () => {
  const { data: session } = useSession();
  const { user, isLoading } = useUserProfileStore();

  const isProfileOwner = Boolean(user && session?.user && user.email === session.user.email);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
      <h2 className="text-2xl font-bold">Threads</h2>

      {isLoading ? <Skeleton className="h-10 w-full md:w-32" /> : null}

      {!isLoading && isProfileOwner ? (
        <Button aria-label="Manage Containers" asChild className="md:w-auto" size="sm" variant="outline">
          <Link className="md:w-auto" href="/books">
            <ManageIcon className="mr-2" />
            Manage Threads
          </Link>
        </Button>
      ) : null}
    </div>
  );
};

export default UserProfileThreadsHeader;
