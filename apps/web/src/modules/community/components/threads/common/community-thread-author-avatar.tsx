import React from 'react';

import { ThreadWithDetails } from '@modules/community/types/community.types';

import { cva, type VariantProps } from 'class-variance-authority';
import UserAvatar from '@modules/common/components/users/user-avatar';

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

  return (
    <UserAvatar
      className={variants({ size })}
      image={author.image}
      alt={`Thread ${author.name} Author`}
      name={author.name}
      width={75}
      height={75}
    />
  );
};

export default CommunityThreadAuthorAvatar;
