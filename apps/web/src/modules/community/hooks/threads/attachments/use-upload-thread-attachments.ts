import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadAttachmentUploadPostResponse } from '@modules/api/types/community-api.types';

import { ThreadUploadContentAttachment } from '@modules/community/types/community-thread-validations.types';

interface UploadThreadAttachmentsData {
  attachments: ThreadUploadContentAttachment[];
  threadId: string;
}

export interface UseUploadThreadAttachmentsReturn {
  uploadAttachments: Pick<
    UseMutationResult<ThreadAttachmentUploadPostResponse, Error, UploadThreadAttachmentsData>,
    'mutateAsync'
  >['mutateAsync'];
}

export const useUploadThreadAttachments = (): UseUploadThreadAttachmentsReturn => {
  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadAttachmentUploadPostResponse, Error, UploadThreadAttachmentsData>({
    mutationFn: async (data) => {
      const { attachments, threadId } = data;

      const formData = new FormData();
      formData.append('threadId', threadId);
      attachments.forEach((attachment) => {
        const fileName = attachment.image.name;
        formData.append(fileName, attachment.image);
        formData.append(`${fileName}-description`, attachment.description);
      });

      const url = new URL('/api/community/thread/attachments/upload', __URL__);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const responseData = (await response.json()) as ThreadAttachmentUploadPostResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      return responseData;
    },
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    uploadAttachments: mutateAsync,
  };
};
