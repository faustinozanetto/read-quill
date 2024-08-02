import { render } from 'jsx-email';
import { Resend } from 'resend';
import type { ReactElement } from 'react';

const BUSINESS_EMAIL = 'business@readquill.com';

interface SendEmailParams {
  email: string;
  subject: string;
  template: ReactElement;
}

export const sendEmail = async (
  client: Resend,
  params: SendEmailParams
): Promise<ReturnType<typeof client.emails.create>> => {
  const { email, subject, template } = params;

  const html = await render(template);

  const result = await client.emails.send({
    from: `Read Quill <${BUSINESS_EMAIL}>`,
    to: [email],
    subject,
    html,
  });

  return result;
};
