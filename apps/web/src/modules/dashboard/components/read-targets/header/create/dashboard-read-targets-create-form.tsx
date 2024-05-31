import React from 'react';
import type { z } from 'zod';
import { Button, PlusIcon, cn, LoadingIcon } from '@read-quill/design-system';
import { createReadTargetsValidationSchema } from '@modules/dashboard/validations/dashboard.validations';

import DashboardReadTargetsForm from '../../forms/dashboard-read-targets-form';
import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';
import { zodResolver } from '@hookform/resolvers/zod';

export type DashboardReadTargetsCreateFormData = z.infer<typeof createReadTargetsValidationSchema>;

const STEPS_DATA: MultiStepFormStep<DashboardReadTargetsCreateFormData>[] = [
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

interface DashboardReadTargetsCreateFormProps {
  onSubmit: (data: DashboardReadTargetsCreateFormData) => void;
}

const DashboardReadTargetsCreateForm: React.FC<DashboardReadTargetsCreateFormProps> = (props) => {
  const { onSubmit } = props;

  return (
    <DashboardReadTargetsForm
      data={STEPS_DATA}
      resolver={zodResolver(createReadTargetsValidationSchema)}
      onSubmit={onSubmit}
    >
      {(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;
        return (
          <Button
            aria-label="Edit Read Targets"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
            Create
          </Button>
        );
      }}
    </DashboardReadTargetsForm>
  );
};

export default DashboardReadTargetsCreateForm;
