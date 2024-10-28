import React from 'react';

import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';

import { Button, LoadingIcon, PlusIcon, cn } from '@read-quill/design-system';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateReferralCodeFormActionData } from '@modules/referrals/types/referrals-validations.types';
import { REFERRALS_ACTIONS_VALIDATIONS_FORMS } from '@modules/referrals/lib/referrals.validations';
import ReferralsFormCode from '../../forms/referrals-form-code';

const STEPS_DATA: MultiStepFormStep<CreateReferralCodeFormActionData>[] = [
  {
    title: 'Referral Code',
    fields: ['referralCode'],
  },
];

interface CreateReferralCodeFormProps {
  userId?: string;
  onSubmit: (data: CreateReferralCodeFormActionData) => void;
}

const CreateReferralCodeForm: React.FC<CreateReferralCodeFormProps> = (props) => {
  const { onSubmit, userId } = props;

  return (
    <MultiStepFormWrapper
      data={STEPS_DATA}
      resolver={zodResolver(REFERRALS_ACTIONS_VALIDATIONS_FORMS.CREATE)}
      defaultValues={{ userId }}
      onSubmit={onSubmit}
      renderSubmitButton={(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;

        return (
          <Button
            aria-label="Create Referral Code"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
            Create
          </Button>
        );
      }}
    >
      {(form, currentStep) => <>{currentStep === 0 && <ReferralsFormCode />}</>}
    </MultiStepFormWrapper>
  );
};

export default CreateReferralCodeForm;
