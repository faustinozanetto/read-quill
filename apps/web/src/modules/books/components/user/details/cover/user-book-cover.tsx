import React from 'react';
import Image from 'next/image';

interface UserBookCoverProps {
  coverUrl: string;
}

const UserBookCover: React.FC<UserBookCoverProps> = (props) => {
  const { coverUrl } = props;

  return (
    <Image
      src={coverUrl}
      alt="Book Cover"
      aria-label="Boko Cover"
      draggable={false}
      width={512}
      height={512}
      priority
      className="h-80 w-full rounded-lg border shadow object-cover object-center md:h-[400px] md:w-60"
    />
  );
};

export default UserBookCover;
