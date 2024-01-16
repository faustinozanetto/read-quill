import React from 'react';
import UserProfileDetails from './details/user-profile-details';
import UserProfileBooks from './books/user-profile-books';

const UserProfile: React.FC = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <UserProfileDetails />
      <UserProfileBooks />
    </section>
  );
};

export default UserProfile;
