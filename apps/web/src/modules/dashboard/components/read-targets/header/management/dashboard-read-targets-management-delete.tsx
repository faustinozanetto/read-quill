import React from 'react';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { ThreadDeleteResponse } from '@modules/api/types/community-api.types';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

const DashboardReadTargetsManagementDelete: React.FC = () => {
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      try {
        const url = new URL('/api/dashboard/read-targets', __URL__);
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Could not delete targets!');
        }

        return response.json() as Promise<ThreadDeleteResponse>;
      } catch (error) {
        let errorMessage = 'Could not delete targets!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: async (data) => {
      if (data && data.success) {
        await queryClient.invalidateQueries(['dashboard-read-targets-created']);
        await queryClient.invalidateQueries(['dashboard-read-targets']);
        toast({ variant: 'success', content: `Targets deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Targets" onDeleted={mutateAsync} variant="outline-destructive" size="sm">
      <DeleteIcon className="stroke-current mr-2" /> Delete Targets
    </ManagementDeleteObject>
  );
};

export default DashboardReadTargetsManagementDelete;
