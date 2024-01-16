import React from 'react';
import Image from 'next/image';

interface UserProfileAvatarProps {
  avatarUrl: string;
}

const UserProfileAvatar: React.FC<UserProfileAvatarProps> = (props) => {
  const { avatarUrl } = props;

  return (
    <Image
      alt="User Avatar"
      aria-label="User Avatar"
      className="h-32 w-full rounded-lg object-cover object-center md:h-36 md:w-36"
      draggable={false}
      height={512}
      priority
      src={avatarUrl}
      width={512}
    />
  );
};

export default UserProfileAvatar;
