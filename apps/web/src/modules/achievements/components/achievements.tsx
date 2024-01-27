'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import UnLockedAchievements from './un-locked/un-locked-achievements';

const Achievements: React.FC = () => {
  const { toast } = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      try {
        const url = new URL('/api/achievements/check', __URL__);
        const response = await fetch(url, { method: 'POST' });
        if (!response.ok) {
          throw new Error('Could not check for achievements!');
        }
      } catch (error) {
        toast({ variant: 'error', content: 'Could not check for user achievements!' });
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={async () => {
          await mutateAsync();
        }}
      >
        Check
      </Button>
      <UnLockedAchievements />
    </div>
  );
};

export default Achievements;
