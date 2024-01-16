import React from 'react';
import DesktopNavigation from './desktop/desktop-navigation';
import MobileNavigation from './mobile/mobile-navigation';

const Navigation: React.FC = () => {
  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  );
};

export default Navigation;
