import { DashboardReadTargetsPostResponse } from '@modules/api/types/dashboard-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { DashboardReadTargetsCreateFormData } from '@modules/dashboard/components/read-targets/header/create/dashboard-read-targets-create-form';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type CreateReadTargetsMutationResult = UseMutationResult<
  DashboardReadTargetsPostResponse,
  Error,
  DashboardReadTargetsCreateFormData
>;
type CreateReadTargetsMutationParams = UseMutationOptions<
  DashboardReadTargetsPostResponse,
  Error,
  DashboardReadTargetsCreateFormData
>;

interface UseCreateReadTargetsReturn {
  createReadTargets: CreateReadTargetsMutationResult['mutateAsync'];
}

interface UseCreateReadTargetsParams {
  onSuccess: NonNullable<CreateReadTargetsMutationParams['onSuccess']>;
}

export const useCreateReadTargets = (params: UseCreateReadTargetsParams): UseCreateReadTargetsReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<DashboardReadTargetsPostResponse, Error, DashboardReadTargetsCreateFormData>({
    mutationKey: ['create-read-targets'],
    mutationFn: async (data) => {
      const url = new URL('/api/dashboard/read-targets', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as DashboardReadTargetsPostResponse;

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
    createReadTargets: mutateAsync,
  };
};
