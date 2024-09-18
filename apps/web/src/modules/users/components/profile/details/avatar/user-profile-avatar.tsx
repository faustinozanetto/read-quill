import React from 'react';
import Image from 'next/image';
import { Image as DBImage } from '@read-quill/database';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import UserProfileAvatarUpdate from './user-profile-avatar-update';
import { useUserContext } from '@modules/users/hooks/use-user-context';

interface UserProfileAvatarProps {
  avatar: DBImage;
}

const UserProfileAvatar: React.FC<UserProfileAvatarProps> = (props) => {
  const { avatar } = props;

  const { user: authUser } = useAuthContext();
  const { user } = useUserContext((s) => s);

  const isProfileOwner = Boolean(authUser && user.email === authUser.email);
  const url = getImagePublicUrl('UserAvatars', avatar.path);

  return (
    <div className="relative">
      <Image
        src={url}
        alt="User Avatar"
        aria-label="User Avatar"
        className="h-32 w-full rounded-lg object-cover object-center md:h-36 md:w-36"
        draggable={false}
        priority
        height={512}
        width={512}
      />
      {isProfileOwner && <UserProfileAvatarUpdate />}
    </div>
  );
};

export default UserProfileAvatar;
