import React from 'react';
import UserProfileDetails from './details/user-profile-details';
import UserProfileBooks from './books/user-profile-books';
import UserProfilThreads from './threads/user-profile-threads';
import { User } from '@read-quill/database';
import { UserProvider } from '../state/user-provider';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user } = props;

  return (
    <UserProvider user={user}>
      <section className="mx-auto flex max-w-6xl flex-col gap-4">
        <UserProfileDetails />
        <UserProfileBooks />
        <UserProfilThreads />
      </section>
    </UserProvider>
  );
};

export default UserProfile;
