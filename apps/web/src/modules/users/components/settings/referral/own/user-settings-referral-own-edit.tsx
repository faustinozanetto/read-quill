'use client';

import React from 'react';
import { Session } from 'next-auth';

import { Button, EditIcon } from '@read-quill/design-system';

import { useQueryClient } from '@tanstack/react-query';
import { EditReferralCode } from '@modules/referrals/components/own/edit/edit-referral-code';

interface UserSettingsReferralOwnEditProps {
  session: Session;
}

const UserSettingsReferralOwnEdit: React.FC<UserSettingsReferralOwnEditProps> = (props) => {
  const { session } = props;

  const queryClient = useQueryClient();

  const handleChangeSuccess = async () => {
    await queryClient.refetchQueries({ queryKey: ['user-referral-code', session.user.id] });
  };

  return (
    <EditReferralCode
      editButton={
        <Button size="icon" className="ml-auto" title="Change your code">
          <EditIcon />
        </Button>
      }
      onSuccess={handleChangeSuccess}
    />
  );
};
export default UserSettingsReferralOwnEdit;
