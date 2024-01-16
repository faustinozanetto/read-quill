import React from 'react';
import type { ButtonProps } from '@read-quill/design-system';
import { Button, LogOutIcon, cn } from '@read-quill/design-system';
import { signOut } from 'next-auth/react';

export interface NavigationLogoutProps extends ButtonProps {
  children?: React.ReactNode;
}

const NavigationLogout: React.FC<NavigationLogoutProps> = (props) => {
  const { className, children, ...rest } = props;

  const handleLogout = async (): Promise<void> => {
    await signOut();
  };

  return (
    <Button className={cn('gap-2', className)} onClick={handleLogout} variant="ghost" {...rest}>
      <LogOutIcon />
      {children}
    </Button>
  );
};

export default NavigationLogout;
