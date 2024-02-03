import { render } from 'jsx-email';
import { Resend } from 'resend';
import type { ReactElement, JSXElementConstructor } from 'react';

const resendClient = new Resend(process.env.RESENND_API_KEY);

interface SendEmailParams {
  email: string;
  subject: string;
  template: ReactElement<unknown, JSXElementConstructor<unknown>>;
}

export const sendEmail = async (params: SendEmailParams): Promise<ReturnType<typeof resendClient.emails.create>> => {
  const { email, subject, template } = params;

  const html = await render(template);

  const result = await resendClient.emails.send({
    from: 'Read Quill <onboarding@faustinozanetto.com>',
    to: [email],
    subject,
    html,
  });

  return result;
};
