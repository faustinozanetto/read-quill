import { render } from 'jsx-email';
import { Resend } from 'resend';
import type { ReactElement, JSXElementConstructor } from 'react';

const BUSINESS_EMAIL = 'business@readquill.com';
const resendClient = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  email: string;
  subject: string;
  template: ReactElement<unknown, JSXElementConstructor<unknown>>;
}

export const sendEmail = async (params: SendEmailParams): Promise<ReturnType<typeof resendClient.emails.create>> => {
  const { email, subject, template } = params;

  const html = await render(template);

  const result = await resendClient.emails.send({
    from: `Read Quill <${BUSINESS_EMAIL}>`,
    to: [email],
    subject,
    html,
  });

  return result;
};
