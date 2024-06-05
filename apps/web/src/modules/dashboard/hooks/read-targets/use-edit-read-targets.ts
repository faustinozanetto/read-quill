import { DashboardReadTargetsPatchResponse } from '@modules/api/types/dashboard-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';

import { DashboardReadTargetsManagementEditFormData } from '@modules/dashboard/components/read-targets/header/management/edit/dashboard-read-targets-management-edit-form';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type EditReadTargetsMutationResult = UseMutationResult<
  DashboardReadTargetsPatchResponse,
  Error,
  DashboardReadTargetsManagementEditFormData
>;
type EditReadTargetsMutationParams = UseMutationOptions<
  DashboardReadTargetsPatchResponse,
  Error,
  DashboardReadTargetsManagementEditFormData
>;

interface UseEditReadTargetsReturn {
  editReadTargets: EditReadTargetsMutationResult['mutateAsync'];
}

interface UseEditReadTargetsParams {
  onSuccess: NonNullable<EditReadTargetsMutationParams['onSuccess']>;
}

export const useEditReadTargets = (params: UseEditReadTargetsParams): UseEditReadTargetsReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<
    DashboardReadTargetsPatchResponse,
    Error,
    DashboardReadTargetsManagementEditFormData
  >({
    mutationKey: ['edit-read-targets'],
    mutationFn: async (data) => {
      const url = new URL('/api/dashboard/read-targets', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      const responseData = (await response.json()) as DashboardReadTargetsPatchResponse;

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
    editReadTargets: mutateAsync,
  };
};
