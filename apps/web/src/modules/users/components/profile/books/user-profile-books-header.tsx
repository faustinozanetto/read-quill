import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useUserProfileStore } from '@modules/users/state/user-profile.slice';
import { Button, Skeleton } from '@read-quill/design-system';

const UserProfileBooksHeader: React.FC = () => {
  const { data: session } = useSession();
  const { user, isLoading } = useUserProfileStore();

  const isProfileOwner = (user && session && session.user && user.email === session.user.email) as boolean;

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
      <h2 className="text-2xl font-bold">Books</h2>
      {/* Management */}
      {isLoading ? (
        <Skeleton className="h-10 w-32" />
      ) : isProfileOwner ? (
        <Button asChild className="w-full md:w-auto" aria-label="Manage Containers">
          <Link href="/books" className="w-full md:w-auto">
            Manage Books
          </Link>
        </Button>
      ) : null}
    </div>
  );
};

export default UserProfileBooksHeader;
