import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { ThreadAttachmentDeleteResponse } from '@modules/api/types/community-api.types';
import { DeleteThreadAttachmentApiActionData } from '@modules/community/types/community-thread-validations.types';

type ThreadDeleteAttachmentMutationResult = UseMutationResult<
  ThreadAttachmentDeleteResponse,
  Error,
  DeleteThreadAttachmentApiActionData
>;
type ThreadDeleteAttachmentMutationParams = UseMutationOptions<
  ThreadAttachmentDeleteResponse,
  Error,
  DeleteThreadAttachmentApiActionData
>;

interface UseThreadDeleteAttachmentReturn {
  deleteAttachment: ThreadDeleteAttachmentMutationResult['mutateAsync'];
}

interface UseThreadDeleteAttachmentParams {
  onSuccess: NonNullable<ThreadDeleteAttachmentMutationParams['onSuccess']>;
}

export const useThreadDeleteAttachment = (params: UseThreadDeleteAttachmentParams): UseThreadDeleteAttachmentReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadAttachmentDeleteResponse, Error, DeleteThreadAttachmentApiActionData>({
    mutationKey: ['thread-delete-attachment'],
    mutationFn: async (data) => {
      const url = new URL('/api/community/thread/attachment', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      const responseData = (await response.json()) as ThreadAttachmentDeleteResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      return responseData;
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
