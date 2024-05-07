import React from 'react';

import { ThreadWithDetails } from '@modules/community/types/community.types';
import Image from 'next/image';

interface CommunityThreadAuthorProps {
  author: ThreadWithDetails['author'];
}

const CommunityThreadAuthor: React.FC<CommunityThreadAuthorProps> = (props) => {
  const { author } = props;

  const authorInitials =
    author.name &&
    author.name
      .split(' ')
      .map((char) => char.charAt(0).toUpperCase())
      .join('');

  return (
    <>
      {author.image && (
        <Image
          src={author.image}
          alt="Thread Autor Image"
          width={50}
          height={50}
          className="rounded-full shadow border"
        />
      )}
      {!author.image && author.name && (
        <div className="w-12 h-12 rounded-full shadow border text-lg font-bold flex items-center justify-center aspect-square text-primary">
          {authorInitials}
        </div>
      )}
    </>
  );
};

export default CommunityThreadAuthor;
