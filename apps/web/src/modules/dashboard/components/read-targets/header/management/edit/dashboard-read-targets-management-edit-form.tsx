import React from 'react';
import type { z } from 'zod';
import { Button, cn, LoadingIcon, EditIcon } from '@read-quill/design-system';
import { editReadTargetsValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';

import DashboardReadTargetsForm from '../../../forms/dashboard-read-targets-form';
import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReadTargets } from '@read-quill/database';
import { DashboardReadTargets } from '@modules/dashboard/types/dashboard.types';

export type DashboardReadTargetsManagementEditFormData = z.infer<typeof editReadTargetsValidationSchema>;

const STEPS_DATA: MultiStepFormStep<DashboardReadTargetsManagementEditFormData>[] = [
  {
    title: 'Daily Target',
    fields: ['daily'],
  },
  {
    title: 'Weekly Target',
    fields: ['weekly'],
  },
  {
    title: 'Monthly Target',
    fields: ['monthly'],
  },
];

interface DashboardReadTargetsManagementEditFormProps {
  initialData: DashboardReadTargets['targetReadTargets'];
  onSubmit: (data: DashboardReadTargetsManagementEditFormData) => void;
}

const DashboardReadTargetsManagementEditForm: React.FC<DashboardReadTargetsManagementEditFormProps> = (props) => {
  const { initialData, onSubmit } = props;

  return (
    <DashboardReadTargetsForm
      data={STEPS_DATA}
      defaultValues={initialData}
      resolver={zodResolver(editReadTargetsValidationSchema)}
      onSubmit={onSubmit}
    >
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
