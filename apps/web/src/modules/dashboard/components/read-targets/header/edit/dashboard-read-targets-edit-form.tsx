import React from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, cn, LoadingIcon, EditIcon } from '@read-quill/design-system';
import { editReadTargetsValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import DashboardReadTargetsFormDaily from '../../../forms/read-targets/dashboard-read-targets-form-daily';
import DashboardReadTargetsFormWeekly from '../../../forms/read-targets/dashboard-read-targets-form-weekly';
import DashboardReadTargetsFormMonthly from '../../../forms/read-targets/dashboard-read-targets-form-monthly';
import { ReadTargets } from '@read-quill/database';

export type DashboardReadTargetsEditFormData = z.infer<typeof editReadTargetsValidationSchema>;

interface DashboardReadTargetsEditFormProps {
  initialData: Omit<ReadTargets, 'id' | 'userId'>;
  onSubmit: (data: DashboardReadTargetsEditFormData) => void;
}

const DashboardReadTargetsEditForm: React.FC<DashboardReadTargetsEditFormProps> = (props) => {
  const { initialData, onSubmit } = props;

  const form = useForm<DashboardReadTargetsEditFormData>({
    resolver: zodResolver(editReadTargetsValidationSchema),
    mode: 'onBlur',
    defaultValues: { ...initialData },
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <DashboardReadTargetsFormDaily />
        <DashboardReadTargetsFormWeekly />
        <DashboardReadTargetsFormMonthly />

        <DialogFooter className="col-span-2">
          <Button
            aria-label="Edit Read Targets"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <EditIcon className="mr-2" />}
            Edit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default DashboardReadTargetsEditForm;
