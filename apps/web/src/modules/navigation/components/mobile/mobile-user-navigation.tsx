'use client';

import { LogOutIcon } from '@read-quill/design-system';
import { buttonVariants } from '@read-quill/design-system';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  UserIcon,
} from '@read-quill/design-system';
import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import NavigationLogout from '../auth/navigation-logout';

interface MobileUserNavigationProps {
  session: Session;
}

const MobileUserNavigation: React.FC<MobileUserNavigationProps> = (props) => {
  const { session } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ size: 'icon', variant: 'ghost' })}>
        <UserIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[100]">
        <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2" asChild>
          <Link href={`/users/${session.user.id}`}>
            <UserIcon /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NavigationLogout className="w-full justify-start font-normal">Logout</NavigationLogout>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileUserNavigation;
