import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useUploadThreadAttachments } from './attachments/use-upload-thread-attachments';
import { ThreadPostResponse } from '@modules/api/types/community-api.types';
import { CreateThreadFormActionData } from '@modules/community/types/community-thread-validations.types';

type CreateThreadMutationResult = UseMutationResult<ThreadPostResponse, Error, CreateThreadFormActionData>;
type CreateThreadMutationParams = UseMutationOptions<ThreadPostResponse, Error, CreateThreadFormActionData>;

interface UseCreateThreadReturn {
  createThread: CreateThreadMutationResult['mutateAsync'];
}

interface UseCreateThreadParams {
  onSuccess: NonNullable<CreateThreadMutationParams['onSuccess']>;
}

export const useCreateThread = (params: UseCreateThreadParams): UseCreateThreadReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();
  const { uploadAttachments } = useUploadThreadAttachments();

  const { mutateAsync } = useMutation<ThreadPostResponse, Error, CreateThreadFormActionData>({
    mutationKey: ['thread-create'],
    mutationFn: async (data) => {
      const { title, content, keywords } = data;

      const url = new URL('/api/community/thread', __URL__);
      const body = JSON.stringify({
        title,
        keywords,
        content: content.content,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as ThreadPostResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      // Upload attachments if any.
      if (data.content.attachments && responseData.data?.thread) {
        await uploadAttachments({
          attachments: data.content.attachments,
          threadId: responseData.data.thread.id,
        });
      }

      return responseData;
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    createThread: mutateAsync,
  };
};
