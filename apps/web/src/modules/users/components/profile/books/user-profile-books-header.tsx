import React from 'react';
import Link from 'next/link';
import { Button, ManageIcon, Skeleton } from '@read-quill/design-system';
import { useUserProfileStore } from '@modules/users/state/user-profile.slice';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

const UserProfileBooksHeader: React.FC = () => {
  const authUser = useAuthContext((s) => s.user);
  const { user, isLoading } = useUserProfileStore();

  const isProfileOwner = Boolean(user && authUser && user.email === authUser.email);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
      <h2 className="text-2xl font-bold">Books</h2>

      {isLoading ? <Skeleton className="h-10 w-full md:w-32" /> : null}

      {!isLoading && isProfileOwner ? (
        <Button aria-label="Manage Containers" asChild className="md:w-auto" size="sm" variant="outline">
          <Link className="md:w-auto" href="/books">
            <ManageIcon className="mr-2" />
            Manage Books
          </Link>
        </Button>
      ) : null}
    </div>
  );
};

export default UserProfileBooksHeader;
