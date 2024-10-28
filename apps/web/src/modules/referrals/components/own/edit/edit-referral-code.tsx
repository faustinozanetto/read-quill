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

import { useEditReferralCode, UseEditReferralCodeParams } from '@modules/referrals/hooks/own/use-edit-referral-code';
import EditReferralCodeForm from './edit-referral-code-form';

interface EditReferralCodeProps {
  editButton: React.ReactNode;
  onSuccess: UseEditReferralCodeParams['onSuccess'];
}

export const EditReferralCode: React.FC<EditReferralCodeProps> = (props) => {
  const { editButton, onSuccess } = props;

  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { editReferralCode } = useEditReferralCode({
    onSuccess: async (data, variables, context) => {
      if (data.data?.referralCode) {
        await onSuccess(data, variables, context);

        toast({ variant: 'success', content: 'Referral code changed successfully!' });
        setIsDialogOpen(false);
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{editButton}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Referral Code</DialogTitle>
          <DialogDescription>Modify your used referral code.</DialogDescription>
        </DialogHeader>

        <EditReferralCodeForm onSubmit={editReferralCode} />
      </DialogContent>
    </Dialog>
  );
};
