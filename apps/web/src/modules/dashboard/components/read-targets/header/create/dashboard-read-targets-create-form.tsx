import React from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, PlusIcon, cn, LoadingIcon } from '@read-quill/design-system';
import { createReadTargetsValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import DashboardReadTargetsFormDaily from '../../../forms/read-targets/dashboard-read-targets-form-daily';
import DashboardReadTargetsFormWeekly from '../../../forms/read-targets/dashboard-read-targets-form-weekly';
import DashboardReadTargetsFormMonthly from '../../../forms/read-targets/dashboard-read-targets-form-monthly';

export type DashboardReadTargetsCreateFormData = z.infer<typeof createReadTargetsValidationSchema>;

interface DashboardReadTargetsCreateFormProps {
  onSubmit: (data: DashboardReadTargetsCreateFormData) => void;
}

const DashboardReadTargetsCreateForm: React.FC<DashboardReadTargetsCreateFormProps> = (props) => {
  const { onSubmit } = props;

  const form = useForm<DashboardReadTargetsCreateFormData>({
    resolver: zodResolver(createReadTargetsValidationSchema),
    mode: 'onBlur',
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
            aria-label="Create Read Targets"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default DashboardReadTargetsCreateForm;
