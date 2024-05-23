import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadAttachmentUploadPostResponse } from '@modules/api/types/community-api.types';
import { extractAttachmentNameFromFile } from '@modules/community/lib/thread-attachments.lib';
import { ThreadUploadContentAttachment } from '@modules/community/types/community-thread-validations.types';

export interface UseUploadThreadAttachmentsReturn {
  uploadAttachments: Pick<
    UseMutationResult<ThreadAttachmentUploadPostResponse, Error, ThreadUploadContentAttachment[]>,
    'mutateAsync'
  >['mutateAsync'];
}

export const useUploadThreadAttachments = (): UseUploadThreadAttachmentsReturn => {
  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadAttachmentUploadPostResponse, Error, ThreadUploadContentAttachment[]>({
    mutationFn: async (data) => {
      const formData = new FormData();
      data.forEach((attachment) => {
        const fileName = extractAttachmentNameFromFile(attachment.image);
        formData.append(fileName, attachment.image);
      });

      const url = new URL('/api/community/thread/attachment/upload', __URL__);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload thread attachments!');
      }

      return await response.json();
    },
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    uploadAttachments: mutateAsync,
  };
};
