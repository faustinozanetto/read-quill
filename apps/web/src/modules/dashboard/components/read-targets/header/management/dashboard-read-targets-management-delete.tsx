import React from 'react';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { useDeleteReadTargets } from '@modules/dashboard/hooks/read-targets/use-delete-read-targets';

const DashboardReadTargetsManagementDelete: React.FC = () => {
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { deleteReadTargets } = useDeleteReadTargets({
    onSuccess: async (data) => {
      if (data.success) {
        await queryClient.refetchQueries(['dashboard-read-targets-created']);
        await queryClient.refetchQueries(['dashboard-read-targets']);
        toast({ variant: 'success', content: `Targets deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject
      label="Delete Targets"
      onDeleted={deleteReadTargets}
      variant="outline-destructive"
      size="sm"
    >
      <DeleteIcon className="stroke-current mr-2" /> Delete Targets
    </ManagementDeleteObject>
  );
};

export default DashboardReadTargetsManagementDelete;
