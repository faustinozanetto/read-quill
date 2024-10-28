'use client';

import React from 'react';

import { Button, EditIcon } from '@read-quill/design-system';

import { useQueryClient } from '@tanstack/react-query';
import { ChangeReferralCode } from '@modules/referrals/components/used/change/change-referral-code';
import { Session } from 'next-auth';

interface UserSettingsReferralUsedChangeProps {
  session: Session;
}

const UserSettingsReferralUsedChange: React.FC<UserSettingsReferralUsedChangeProps> = (props) => {
  const { session } = props;

  const queryClient = useQueryClient();

  const handleChangeSuccess = async () => {
    await queryClient.refetchQueries({ queryKey: ['used-referral-code', session.user.id] });
  };

  return (
    <ChangeReferralCode
      changeButton={
        <Button size="icon" className="ml-auto" title="Edit used code">
          <EditIcon />
        </Button>
      }
      onSuccess={handleChangeSuccess}
    />
  );
};
export default UserSettingsReferralUsedChange;
