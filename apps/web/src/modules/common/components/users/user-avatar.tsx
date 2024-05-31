'use client';
import React from 'react';

import Image, { ImageProps } from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { User } from '@read-quill/database';
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

interface UserAvatarProps extends VariantProps<typeof variants>, Omit<ImageProps, 'src'> {
  image: User['image'];
  name: User['name'];
}

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const { image, name, size, className, ...rest } = props;

  const userInitials =
    name &&
    name
      .split(' ')
      .map((char) => char.charAt(0).toUpperCase())
      .join('');

  return (
    <>
      {image && (
        <Image src={image} className={cn('rounded-full shadow border', variants({ size }), className)} {...rest} />
      )}
      {!image && name && (
        <div
          className={cn(
            'w-12 h-12 rounded-full shadow border text-lg font-bold flex items-center justify-center aspect-square text-primary',
            variants({ size })
          )}
        >
          {userInitials}
        </div>
      )}
    </>
  );
};

export default UserAvatar;
