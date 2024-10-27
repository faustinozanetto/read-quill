'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useToast,
} from '@read-quill/design-system';

import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import { useChangeReferralCode, UseChangeReferralCodeParams } from '@modules/referrals/hooks/use-change-referral-code';
import ChangeReferralCodeForm from './change-referral-code-form';

interface ChangeReferralCodeProps {
  changeButton: React.ReactNode;
  onSuccess: UseChangeReferralCodeParams['onSuccess'];
}

export const ChangeReferralCode: React.FC<ChangeReferralCodeProps> = (props) => {
  const { changeButton, onSuccess } = props;

  const { user } = useAuthContext();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { changeReferralCode } = useChangeReferralCode({
    onSuccess: async (data, variables, context) => {
      if (data.data?.success) {
        await onSuccess(data, variables, context);

        toast({ variant: 'success', content: 'Referral code changeed successfully!' });
        setIsDialogOpen(false);
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{changeButton}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Your Referral Code</DialogTitle>
          <DialogDescription>Modify your used referral code.</DialogDescription>
        </DialogHeader>

        <ChangeReferralCodeForm onSubmit={changeReferralCode} />
      </DialogContent>
    </Dialog>
  );
};
