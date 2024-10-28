import React from 'react';

import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';

import { Button, LoadingIcon, PlusIcon, cn } from '@read-quill/design-system';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';

import { ChangeReferralCodeFormActionData } from '@modules/referrals/types/referrals-validations.types';
import { REFERRALS_ACTIONS_VALIDATIONS_FORMS } from '@modules/referrals/lib/referrals.validations';
import ReferralsFormCodeUsers from '../../forms/referrals-form-code-users';

const STEPS_DATA: MultiStepFormStep<ChangeReferralCodeFormActionData>[] = [
  {
    title: 'Referral Code',
    fields: ['referralCode'],
  },
];

interface ChangeReferralCodeFormProps {
  onSubmit: (data: ChangeReferralCodeFormActionData) => void;
}

const ChangeReferralCodeForm: React.FC<ChangeReferralCodeFormProps> = (props) => {
  const { onSubmit } = props;

  return (
    <MultiStepFormWrapper
      data={STEPS_DATA}
      resolver={zodResolver(REFERRALS_ACTIONS_VALIDATIONS_FORMS.CHANGE)}
      defaultValues={{ referralCode: undefined }}
      onSubmit={onSubmit}
      renderSubmitButton={(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;

        return (
          <Button
            aria-label="Change Referral Code"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
            Change
          </Button>
        );
      }}
    >
      {(form, currentStep) => <>{currentStep === 0 && <ReferralsFormCodeUsers />}</>}
    </MultiStepFormWrapper>
  );
};

export default ChangeReferralCodeForm;
