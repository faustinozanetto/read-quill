import React from 'react';
import Link from 'next/link';
import { Button } from '@read-quill/design-system';

export interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { href, children } = props;

  return (
    <Button asChild className="w-full justify-start" variant="ghost">
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default NavigationLink;
