import React from 'react';
import Image from 'next/image';

interface UserProfileAvatarProps {
  avatarUrl: string;
}

const UserProfileAvatar: React.FC<UserProfileAvatarProps> = (props) => {
  const { avatarUrl } = props;

  return (
    <Image
      src={avatarUrl}
      alt="User Avatar"
      aria-label="User Avatar"
      draggable={false}
      width={512}
      height={512}
      priority
      className="h-32 w-full rounded-lg object-cover object-center md:h-36 md:w-36"
    />
  );
};

export default UserProfileAvatar;
