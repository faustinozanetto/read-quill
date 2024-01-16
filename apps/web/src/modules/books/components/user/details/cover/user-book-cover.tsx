import React from 'react';
import Image from 'next/image';

interface UserBookCoverProps {
  coverUrl: string;
}

const UserBookCover: React.FC<UserBookCoverProps> = (props) => {
  const { coverUrl } = props;

  return (
    <Image
      alt="Book Cover"
      aria-label="Boko Cover"
      className="h-80 w-full rounded-lg border shadow object-cover object-center md:h-[350px] md:w-60"
      draggable={false}
      height={512}
      priority
      src={coverUrl}
      width={512}
    />
  );
};

export default UserBookCover;
