import React from 'react';
import { CommunityTopUser } from '@modules/community/types/community.types';
import Image from 'next/image';
import Link from 'next/link';
import UserAvatar from '@modules/common/components/users/user-avatar';

interface CommunityTopUserCardProps {
  topUser: CommunityTopUser;
}

const CommunityTopUserCard: React.FC<CommunityTopUserCardProps> = (props) => {
  const {
    topUser: { user, threadsCount, totalVotes },
  } = props;

  return (
    <Link href={`/users/${user.id}`}>
      <div className="border rounded-lg shadow hover:scale-[102%] transition-all hover:border-primary hover:border-2 h-40 flex flex-col">
        <UserAvatar
          image={user.image}
          name={user.name}
          alt={`Top User ${user.name} Avatar`}
          width={250}
          height={250}
          className="rounded-t-lg r rounded-b-none w-full flex-1 object-cover"
        />
        <p className="text-center font-medium mt-1">{threadsCount} Threads</p>
        <p className="text-sm text-center">{totalVotes} Votes</p>
      </div>
    </Link>
  );
};

export default CommunityTopUserCard;
