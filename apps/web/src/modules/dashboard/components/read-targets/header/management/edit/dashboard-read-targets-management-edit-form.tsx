import React from 'react';
import type { z } from 'zod';
import { Button, cn, LoadingIcon, EditIcon } from '@read-quill/design-system';
import { editReadTargetsValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';

import DashboardReadTargetsForm from '../../../forms/dashboard-read-targets-form';

export type DashboardReadTargetsManagementEditFormData = z.infer<typeof editReadTargetsValidationSchema>;

interface DashboardReadTargetsManagementEditFormProps {
  initialData: NonNullable<DashboardReadTargetsGetResponse['result']>['targetReadTargets'];
  onSubmit: (data: DashboardReadTargetsManagementEditFormData) => void;
}

const DashboardReadTargetsManagementEditForm: React.FC<DashboardReadTargetsManagementEditFormProps> = (props) => {
  const { initialData, onSubmit } = props;

  return (
    <DashboardReadTargetsForm initialData={initialData} resolver={editReadTargetsValidationSchema} onSubmit={onSubmit}>
      {(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;

        return (
          <Button
            aria-label="Edit Read Targets"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={!getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <EditIcon className="mr-2 stroke-current" />}
            Edit
          </Button>
        );
      }}
    </DashboardReadTargetsForm>
  );
};

export default DashboardReadTargetsManagementEditForm;
