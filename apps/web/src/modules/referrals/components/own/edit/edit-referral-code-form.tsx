import React from 'react';

import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';

import { Button, EditIcon, LoadingIcon, cn } from '@read-quill/design-system';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  ChangeReferralCodeFormActionData,
  EditReferralCodeFormActionData,
} from '@modules/referrals/types/referrals-validations.types';
import { REFERRALS_ACTIONS_VALIDATIONS_FORMS } from '@modules/referrals/lib/referrals.validations';
import ReferralsFormCode from '../../forms/referrals-form-code';

const STEPS_DATA: MultiStepFormStep<ChangeReferralCodeFormActionData>[] = [
  {
    title: 'Referral Code',
    fields: ['referralCode'],
  },
];

interface EditReferralCodeFormProps {
  onSubmit: (data: EditReferralCodeFormActionData) => void;
}

const EditReferralCodeForm: React.FC<EditReferralCodeFormProps> = (props) => {
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
            aria-label="Edit Referral Code"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <EditIcon className="mr-2" />}
            Edit
          </Button>
        );
      }}
    >
      {(form, currentStep) => <>{currentStep === 0 && <ReferralsFormCode />}</>}
    </MultiStepFormWrapper>
  );
};

export default EditReferralCodeForm;
