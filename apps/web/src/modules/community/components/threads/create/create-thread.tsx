'use client';

import React from 'react';

import CreateThreadForm, { CommunityThreadCreateFormData } from './create-thread-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

const CreateThread: React.FC = () => {
  const { toast } = useToast();

  const handleCreateThread = async (data: CommunityThreadCreateFormData) => {
    try {
      const url = new URL('/api/community/thread', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not post thread!');
      }

      const res = await response.json();

      toast({ variant: 'success', content: `Thread posted successfully!` });
    } catch (error) {
      let errorMessage = 'Could not post thread!';
      if (error instanceof Error) errorMessage = error.message;

      toast({ variant: 'error', content: errorMessage });
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg shadow">
        <h1 className="text-2xl font-bold">Posting Thread</h1>
      </div>
      <div className="p-4 border rounded-lg shadow">
        <CreateThreadForm onSubmit={handleCreateThread} />
      </div>
    </div>
  );
};

export default CreateThread;
