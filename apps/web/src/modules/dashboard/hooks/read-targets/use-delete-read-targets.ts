import { DashboardReadTargetsDeleteResponse } from '@modules/api/types/dashboard-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';

import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type DeleteReadTargetsMutationResult = UseMutationResult<DashboardReadTargetsDeleteResponse, Error, void>;
type DeleteReadTargetsMutationParams = UseMutationOptions<DashboardReadTargetsDeleteResponse, Error, void>;

interface UseDeleteReadTargetsReturn {
  deleteReadTargets: DeleteReadTargetsMutationResult['mutateAsync'];
}

interface UseDeleteReadTargetsParams {
  onSuccess: NonNullable<DeleteReadTargetsMutationParams['onSuccess']>;
}

export const useDeleteReadTargets = (params: UseDeleteReadTargetsParams): UseDeleteReadTargetsReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<DashboardReadTargetsDeleteResponse, Error, void>({
    mutationKey: ['delete-read-targets'],
    mutationFn: async () => {
      const url = new URL('/api/dashboard/read-targets', __URL__);
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Could not delete read targets!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    deleteReadTargets: mutateAsync,
  };
};
