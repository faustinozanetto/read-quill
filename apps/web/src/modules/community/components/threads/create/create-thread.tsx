'use client';

import React from 'react';

import CreateThreadForm from './create-thread-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

import { ThreadPostResponse } from '@modules/api/types/community-api.types';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useUploadThreadAttachments } from '@modules/community/hooks/threads/attachments/use-upload-thread-attachments';
import { CreateThreadFormActionData } from '@modules/community/types/community-thread-validations.types';

const CreateThread: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { uploadAttachments } = useUploadThreadAttachments();

  const { mutateAsync } = useMutation<ThreadPostResponse, Error, CreateThreadFormActionData>({
    mutationFn: async (data) => {
      const { title, content, keywords } = data;

      const url = new URL('/api/community/thread', __URL__);
      const body = JSON.stringify({
        title,
        keywords,
        content: content.content,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not post thread!');
      }

      const result = (await response.json()) as ThreadPostResponse;

      // Upload attachments if any.
      if (data.content.attachments) {
        await uploadAttachments({
          attachments: data.content.attachments,
          threadId: result.thread.id,
        });
      }

      return result;
    },
    onSuccess: async (data) => {
      if (data && data.thread) {
        router.push(`/community/threads/${data.thread.id}`);
        toast({ variant: 'success', content: `Thread posted successfully!` });
      }
    },
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg shadow">
        <h1 className="text-2xl font-bold">Posting Thread</h1>
      </div>
      <div className="p-4 border rounded-lg shadow">
        <CreateThreadForm onSubmit={mutateAsync} />
      </div>
    </div>
  );
};

export default CreateThread;
