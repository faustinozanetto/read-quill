import React from 'react';
import Link from 'next/link';
import { Session } from 'next-auth';

interface LandingNavbarLinksProps {
  session: Session | null;
}

const LandingNavbarLinks: React.FC<LandingNavbarLinksProps> = (props) => {
  const { session } = props;

  return (
    <>
      {session && session.user && (
        <Link className="hover:text-primary hover:underline" href="/dashboard">
          Goto Dashboard
        </Link>
      )}
    </>
  );
};

export default LandingNavbarLinks;
