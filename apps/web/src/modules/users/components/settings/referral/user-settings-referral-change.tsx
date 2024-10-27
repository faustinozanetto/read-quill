'use client';

import React from 'react';
import { Session } from 'next-auth';

import { Button } from '@read-quill/design-system';
import { PlusIcon } from '@read-quill/design-system';

import { ChangeReferralCode } from '@modules/referrals/components/change/change-referral-code';
import { useQueryClient } from '@tanstack/react-query';

interface UserSettingsReferralChangeProps {
  session: Session;
}

const UserSettingsReferralChange: React.FC<UserSettingsReferralChangeProps> = (props) => {
  const { session } = props;

  const queryClient = useQueryClient();

  const handleChangeSuccess = async () => {
    await queryClient.refetchQueries({ queryKey: ['use-referral-code', session.user.id] });
  };

  return (
    <ChangeReferralCode
      changeButton={
        <Button size="sm" className="ml-auto">
          <PlusIcon className="mr-2" />
          Change Referral Code
        </Button>
      }
      onSuccess={handleChangeSuccess}
    />
  );
};
export default UserSettingsReferralChange;
