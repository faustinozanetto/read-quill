'use client';

import React from 'react';

import CreateThreadForm from './create-thread-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

import { useRouter } from 'next/navigation';
import { useCreateThread } from '@modules/community/hooks/threads/use-create-thread';

const CreateThread: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { createThread } = useCreateThread({
    onSuccess: async (data) => {
      if (data && data.thread) {
        router.push(`/community/threads/${data.thread.id}`);
        toast({ variant: 'success', content: `Thread posted successfully!` });
      }
    },
  });

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg shadow">
        <h1 className="text-2xl font-bold">Posting Thread</h1>
      </div>
      <div className="p-4 border rounded-lg shadow">
        <CreateThreadForm onSubmit={createThread} />
      </div>
    </div>
  );
};

export default CreateThread;
