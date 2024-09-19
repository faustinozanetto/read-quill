import React from 'react';
import Image from 'next/image';
import { Image as DBImage } from '@read-quill/database';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import UserProfileAvatarUpdate from './user-profile-avatar-update';
import { useUserContext } from '@modules/users/hooks/use-user-context';

interface UserProfileAvatarProps {
  name: string;
  avatar: DBImage | null;
}

const UserProfileAvatar: React.FC<UserProfileAvatarProps> = (props) => {
  const { name, avatar } = props;

  const { user: authUser } = useAuthContext();
  const { user } = useUserContext((s) => s);

  const isProfileOwner = Boolean(authUser && user.email === authUser.email);
  const url = avatar ? getImagePublicUrl('UserAvatars', avatar.path) : null;

  const userInitials = name
    .split(' ')
    .map((char) => char.charAt(0).toUpperCase())
    .join('');

  return (
    <div className="relative">
      {url ? (
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
      ) : (
        <div className="h-32 w-full rounded-lg object-cover object-center md:h-36 md:w-36 shadow border text-4xl font-bold flex items-center justify-center aspect-square text-primary">
          {userInitials}
        </div>
      )}
      {isProfileOwner && <UserProfileAvatarUpdate />}
    </div>
  );
};

export default UserProfileAvatar;
