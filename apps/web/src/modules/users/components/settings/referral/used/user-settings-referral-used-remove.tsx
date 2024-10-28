'use client';

import React from 'react';

import { Button, DeleteIcon } from '@read-quill/design-system';

import { useQueryClient } from '@tanstack/react-query';
import RemoveReferralCode from '@modules/referrals/components/used/remove-referral-code';
import { Session } from 'next-auth';

interface UserSettingsReferralUsedRemoveProps {
  session: Session;
}

const UserSettingsReferralUsedRemove: React.FC<UserSettingsReferralUsedRemoveProps> = (props) => {
  const { session } = props;

  const queryClient = useQueryClient();

  const handleChangeSuccess = async () => {
    await queryClient.refetchQueries({ queryKey: ['used-referral-code', session.user.id] });
  };

  return (
    <RemoveReferralCode
      removeButton={
        <Button size="icon" variant="destructive" className="ml-auto" title="Remove used code">
          <DeleteIcon className="stroke-current" />
        </Button>
      }
      onSuccess={handleChangeSuccess}
    />
  );
};
export default UserSettingsReferralUsedRemove;
