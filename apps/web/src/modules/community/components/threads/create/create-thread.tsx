'use client';

import React from 'react';

import CreateThreadForm, { CommunityThreadCreateFormData } from './create-thread-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { ThreadContentLayout } from '@modules/community/types/community.types';
import { ThreadAttachmentUploadPostResponse } from '@modules/api/types/community-api.types';
import {
  extractAttachmentNameFromFile,
  extractAttachmentNameFromUrl,
} from '@modules/community/lib/thread-attachments.lib';

const CreateThread: React.FC = () => {
  const { toast } = useToast();

  const uploadThreadAttachments = async (
    attachments: ThreadContentLayout['attachments']
  ): Promise<ThreadAttachmentUploadPostResponse> => {
    const formData = new FormData();
    attachments.forEach((attachment) => {
      const imageName = attachment.image.name.split('.').slice(0, -1).join('');
      formData.append(imageName, attachment.image);
    });

    const url = new URL('/api/community/thread/attachments/upload', __URL__);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload thread attachments!');
    }

    const data: ThreadAttachmentUploadPostResponse = await response.json();
    return data;
  };

  const handleCreateThread = async (data: CommunityThreadCreateFormData) => {
    try {
      let attachmentsUrls: ThreadAttachmentUploadPostResponse['attachmentUrls'] = {};
      if (data.content.attachments) {
        const uploadResult = await uploadThreadAttachments(data.content.attachments);
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

            console.log({ imageNameFromFile, imageNameFromUrl });

            return imageNameFromFile === imageNameFromUrl;
          });

          if (!formAttachment) return acc;

          acc.push({ description: formAttachment.description, url: attachmentUrl });
          return acc;
        },
        []
      );
      console.log({ attachments });

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

      // const res = await response.json();

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
