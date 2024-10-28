'use client';

import React from 'react';

import { Button, DeleteIcon } from '@read-quill/design-system';

import { useQueryClient } from '@tanstack/react-query';
import DeleteReferralCode from '@modules/referrals/components/own/delete-referral-code';

const UserSettingsReferralOwnDelete: React.FC = () => {
  const queryClient = useQueryClient();

  const handleChangeSuccess = async () => {
    await queryClient.refetchQueries({ queryKey: ['user-referral-code'] });
  };

  return (
    <DeleteReferralCode
      deleteButton={
        <Button size="icon" variant="destructive" className="ml-auto" title="Delete your code">
          <DeleteIcon className="stroke-current" />
        </Button>
      }
      onSuccess={handleChangeSuccess}
    />
  );
};
export default UserSettingsReferralOwnDelete;
