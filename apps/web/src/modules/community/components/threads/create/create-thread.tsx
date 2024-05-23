'use client';

import React from 'react';

import CreateThreadForm from './create-thread-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

import { ThreadAttachmentUploadPostResponse, ThreadPostResponse } from '@modules/api/types/community-api.types';
import {
  extractAttachmentNameFromFile,
  extractAttachmentNameFromUrl,
} from '@modules/community/lib/thread-attachments.lib';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useUploadThreadAttachments } from '@modules/community/hooks/threads/attachments/use-upload-thread-attachments';
import { CreateThreadFormActionData } from '@modules/community/types/community-thread-validations.types';

const CreateThread: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { uploadAttachments } = useUploadThreadAttachments();

  const { mutateAsync } = useMutation<ThreadPostResponse, Error, CreateThreadFormActionData>({
    mutationFn: async (data) => {
      let attachmentsUrls: ThreadAttachmentUploadPostResponse['attachmentUrls'] = {};
      if (data.content.attachments) {
        const uploadResult = await uploadAttachments(data.content.attachments);
        attachmentsUrls = uploadResult.attachmentUrls;
      }

      const { title, content, keywords } = data;

      // Construct the attachments each with its decsription and public supabe url.
      const attachments = Object.entries(attachmentsUrls).reduce<{ description: string; url: string }[]>(
        (acc, [attachmentFileName, attachmentUrl]) => {
          if (!content.attachments) return acc;

          // Find in the form attachments the corresponding entry that matches the file name with the one in the record returned by the upload post.
          const formAttachment = content.attachments.find((attachment) => {
            const imageNameFromFile = extractAttachmentNameFromFile(attachment.image);
            const imageNameFromUrl = extractAttachmentNameFromUrl(attachmentUrl);

            return imageNameFromFile === imageNameFromUrl;
          });

          if (!formAttachment) return acc;

          acc.push({ description: formAttachment.description, url: attachmentUrl });
          return acc;
        },
        []
      );

      const url = new URL('/api/community/thread', __URL__);
      const body = JSON.stringify({
        title,
        keywords,
        content: {
          content: content.content,
          attachments,
        },
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not post thread!');
      }

      return await response.json();
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
