import React from 'react';
import UserProfileDetails from './details/user-profile-details';
import UserProfileBooks from './books/user-profile-books';

const UserProfile: React.FC = () => {
  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 md:px-4 lg:px-6">
      <UserProfileDetails />
      <UserProfileBooks />
    </section>
  );
};

export default UserProfile;
