'use client';

import React, { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import LandingNavbarLinks from './landing-navbar-links';
import { Button, HorizontalBarsIcon } from '@read-quill/design-system';

interface LandingNavbarMobileProps {
  session: Session | null;
}

const LandingNavbarMobile: React.FC<LandingNavbarMobileProps> = (props) => {
  const { session } = props;

  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  const toggleMobileNav = () => {
    setShowMobileNav((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (showMobileNav) setShowMobileNav(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [showMobileNav]);

  return (
    <>
      <Button
        aria-label={showMobileNav ? 'Close Mobile Navbar' : 'Open Mobile Navbar'}
        variant="ghost"
        className="sm:hidden"
        onClick={toggleMobileNav}
        size="icon"
      >
        <HorizontalBarsIcon />
      </Button>

      {showMobileNav ? (
        <div className="fixed inset-0 top-20 h-[calc(100vh-6rem)] duration-500 animate-in slide-in-from-top-80 sm:hidden">
          <div className="grid gap-4 rounded-b-lg bg-background p-4 shadow">
            <nav className="grid gap-4">
              <LandingNavbarLinks session={session} />
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LandingNavbarMobile;
