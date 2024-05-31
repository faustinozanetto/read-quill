import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { ThreadAttachmentDeleteResponse } from '@modules/api/types/community-api.types';
import { ThreadAttachment } from '@read-quill/database';

type ThreadDeleteAttachmentMutationResult = UseMutationResult<ThreadAttachmentDeleteResponse, Error, void>;
type ThreadDeleteAttachmentMutationParams = UseMutationOptions<ThreadAttachmentDeleteResponse, Error, void>;

interface UseThreadDeleteAttachmentReturn {
  deleteAttachment: ThreadDeleteAttachmentMutationResult['mutateAsync'];
}

interface UseThreadDeleteAttachmentParams {
  attachment: ThreadAttachment;
  onSuccess: NonNullable<ThreadDeleteAttachmentMutationParams['onSuccess']>;
}

export const useThreadDeleteAttachment = (params: UseThreadDeleteAttachmentParams): UseThreadDeleteAttachmentReturn => {
  const { attachment, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadAttachmentDeleteResponse, Error, void>({
    mutationKey: ['thread-delete-attachment', attachment.id],
    mutationFn: async () => {
      const url = new URL('/api/community/thread/attachment', __URL__);
      const body = JSON.stringify({
        attachmentId: attachment.id,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      if (!response.ok) {
        throw new Error('Could not delete attachment!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    deleteAttachment: mutateAsync,
  };
};
