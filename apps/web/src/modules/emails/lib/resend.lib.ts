import { Resend } from 'resend';

const BUSINESS_EMAIL = 'business@readquill.com';

interface SendEmailParams {
  email: string;
  subject: string;
  react: React.ReactElement | React.ReactNode | null;
}

export const sendEmail = async (
  client: Resend,
  params: SendEmailParams
): Promise<ReturnType<typeof client.emails.create>> => {
  const { email, subject, react } = params;

  const result = await client.emails.send({
    from: `Read Quill <${BUSINESS_EMAIL}>`,
    to: [email],
    subject,
    react,
  });

  return result;
};
