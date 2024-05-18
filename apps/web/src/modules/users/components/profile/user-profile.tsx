import React from 'react';
import UserProfileDetails from './details/user-profile-details';
import UserProfileBooks from './books/user-profile-books';
import UserProfilThreads from './threads/user-profile-threads';

const UserProfile: React.FC = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <UserProfileDetails />
      <UserProfileBooks />
      <UserProfilThreads />
    </section>
  );
};

export default UserProfile;
