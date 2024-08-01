import React from 'react';
import UserProfileBooks from './books/user-profile-books';
import UserProfilThreads from './threads/user-profile-threads';
import UserProfilAchievements from './achievements/user-profile-achievements';

const UserProfile: React.FC = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <UserProfileBooks />
      <UserProfilAchievements />
      <UserProfilThreads />
    </section>
  );
};

export default UserProfile;
