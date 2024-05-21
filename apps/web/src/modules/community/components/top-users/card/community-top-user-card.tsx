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
      <div className="border rounded-lg shadow hover:scale-[102%] transition-all hover:border-primary hover:border-2 flex flex-col items-stretch">
        <div className="relative group flex flex-col">
          <div className="hidden absolute inset-0 group-hover:flex items-center justify-center group-hover:backdrop-blur-md transition-all duration-300">
            <h3 className="text-center font-bold text-primary bg-background">{user.name}</h3>
          </div>
          <UserAvatar
            image={user.image}
            name={user.name}
            alt={`Top User ${user.name} Avatar`}
            width={250}
            height={250}
            className="rounded-t-lg rounded-b-none h-full w-full object-cover"
          />
        </div>
        <p className="text-center font-medium mt-1">{threadsCount} Threads</p>
        <p className="text-sm text-center">{totalVotes} Votes</p>
      </div>
    </Link>
  );
};

export default CommunityTopUserCard;
