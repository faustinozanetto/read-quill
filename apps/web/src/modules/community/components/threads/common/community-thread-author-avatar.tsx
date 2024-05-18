import React from 'react';

import { ThreadWithDetails } from '@modules/community/types/community.types';

import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@read-quill/design-system';

const variants = cva('aspect-square', {
  variants: {
    size: {
      sm: 'w-10 h-10',
      base: 'w-12 h-12',
    },
  },
  defaultVariants: { size: 'base' },
});

interface CommunityThreadAuthorAvatarProps extends VariantProps<typeof variants> {
  author: ThreadWithDetails['author'];
}

const CommunityThreadAuthorAvatar: React.FC<CommunityThreadAuthorAvatarProps> = (props) => {
  const { author, size } = props;

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
          className={cn('rounded-full shadow border', variants({ size }))}
        />
      )}
      {!author.image && author.name && (
        <div
          className={cn(
            'w-12 h-12 rounded-full shadow border text-lg font-bold flex items-center justify-center aspect-square text-primary',
            variants({ size })
          )}
        >
          {authorInitials}
        </div>
      )}
    </>
  );
};

export default CommunityThreadAuthorAvatar;
