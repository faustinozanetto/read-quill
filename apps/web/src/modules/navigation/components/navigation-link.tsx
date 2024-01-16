import React from 'react';
import Link from 'next/link';
import type { ButtonProps } from '@read-quill/design-system';
import { Button } from '@read-quill/design-system';

export interface NavigationLinkProps extends ButtonProps {
  href: string;
  children?: React.ReactNode;
  icon: React.JSX.Element;
}

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { href, className, icon, children, ...rest } = props;

  return (
    <Button asChild className={className} variant="ghost" {...rest}>
      <Link href={href}>
        {icon}
        {children}
      </Link>
    </Button>
  );
};

export default NavigationLink;
