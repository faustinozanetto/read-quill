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
import CreateReferralCodeForm from './create-referral-code-form';

import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import {
  useCreateReferralCode,
  UseCreateReferralCodeParams,
} from '@modules/referrals/hooks/own/use-create-referral-code';

interface CreateReferralCodeProps {
  createButton: React.ReactNode;
  onSuccess: UseCreateReferralCodeParams['onSuccess'];
}

export const CreateReferralCode: React.FC<CreateReferralCodeProps> = (props) => {
  const { createButton, onSuccess } = props;

  const { user } = useAuthContext();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { createReferralCode } = useCreateReferralCode({
    onSuccess: async (data, variables, context) => {
      if (data.data?.referralCode && user) {
        await onSuccess(data, variables, context);

        toast({ variant: 'success', content: 'Referral code created successfully!' });
        setIsDialogOpen(false);
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{createButton}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Your Referral Code</DialogTitle>
          <DialogDescription>Add a unique referral code for your friends to use!.</DialogDescription>
        </DialogHeader>

        <CreateReferralCodeForm userId={user?.id} onSubmit={createReferralCode} />
      </DialogContent>
    </Dialog>
  );
};
