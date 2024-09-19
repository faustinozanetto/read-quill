import { __URL__ } from '@modules/common/lib/common.constants';
import { SendWelcomeEmailPayload } from '../types/email.types';
import { SendWelcomeEmailApiActionData } from '../types/email-validations.types';

export const sendWelcomeEmail = async (payload: SendWelcomeEmailPayload) => {
  const { email, name } = payload;

  const body: SendWelcomeEmailApiActionData = {
    completeName: name,
    subject: 'Welcome to Read Quill!',
    target: email,
  };

  const url = new URL('/api/emails/welcome', __URL__);
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error('Failed to send Welcome Email!');

  return response.json();
};
