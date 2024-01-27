import React from 'react';
import Link from 'next/link';

export interface LandingFooterLinkProps {
  href: string;
  label: string;
}

const LandingFooterLink: React.FC<LandingFooterLinkProps> = (props) => {
  const { href, label } = props;

  return (
    <li>
      <Link href={href}>{label}</Link>
    </li>
  );
};

export default LandingFooterLink;
