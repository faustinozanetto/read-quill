import React from 'react';
import UserProfileDetails from './details/user-profile-details';
import { User } from '@read-quill/database';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user } = props;
  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 md:px-4 lg:px-6">
      <UserProfileDetails user={user} />
    </section>
  );
};

export default UserProfile;
