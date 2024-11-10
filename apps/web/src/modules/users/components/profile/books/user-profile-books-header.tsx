import React from 'react';
import Link from 'next/link';
import { Button, ManageIcon } from '@read-quill/design-system';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import { useUserContext } from '@modules/users/hooks/use-user-context';

const UserProfileBooksHeader: React.FC = () => {
  const { user: authUser } = useAuthContext();
  const { user } = useUserContext((s) => s);

  const isProfileOwner = Boolean(authUser && user.email === authUser.email);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:items-center sm:flex-row sm:justify-between gap-2">
        <h2 className="text-2xl font-bold">📚 Books</h2>

        {isProfileOwner ? (
          <Button aria-label="Manage Containers" asChild className="md:w-auto" size="sm" variant="outline">
            <Link className="md:w-auto" href="/library">
              <ManageIcon className="mr-2" />
              Manage
            </Link>
          </Button>
        ) : null}
      </div>

      <p>
        Discover the books this user has read and enjoyed. Explore their literary journey and find inspiration for your
        next read.
      </p>
    </div>
  );
};

export default UserProfileBooksHeader;
