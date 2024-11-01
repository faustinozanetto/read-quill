import React from 'react';
import { Badge, Skeleton } from '@read-quill/design-system';
import UserAvatar from '@modules/common/components/users/user-avatar';
import { ReferredUser } from '@modules/referrals/types/referrals.types';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import { format } from 'date-fns';
import Link from 'next/link';

interface ReferredUserCardProps {
  referredUser: ReferredUser;
}

const ReferredUserCard: React.FC<ReferredUserCardProps> = (props) => {
  const { referredUser } = props;

  return (
    <div className="flex gap-4 items-center rounded-lg border p-2.5">
      <UserAvatar
        image={
          referredUser.referred.avatar
            ? getImagePublicUrl('UserAvatars', referredUser.referred.avatar?.path)
            : undefined
        }
        name={referredUser.referred.name}
        alt={`${referredUser.referred.name} Avatar`}
        className="h-14 w-14 object-cover"
        initialsClassName="h-14 w-14"
      />
      <div className="space-y-1">
        <Link href={`/users/${referredUser.referred.id}`} className="block hover:underline" title="View User Profile">
          {referredUser.referred.name}
        </Link>
        <Badge>Referred on {new Date(referredUser.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</Badge>
      </div>
    </div>
  );
};

export default ReferredUserCard;
