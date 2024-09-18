import { Resend } from 'resend';
import { SendMagicLinkEmailApiActionData } from '../types/email-validations.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { EmailConfig } from 'next-auth/providers';

export const BUSINESS_EMAIL = 'business@readquill.com';
export const AUTH_RESEND_KEY = process.env.RESEND_API_KEY!;

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

interface VerificationRequestParams {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
  theme: unknown;
  request: Request;
}

export const sendEmailVerificationRequest = async (params: VerificationRequestParams) => {
  const { url: payloadUrl, identifier } = params;

  try {
    const payload: SendMagicLinkEmailApiActionData = {
      url: payloadUrl,
      subject: 'Welcome to Read Quill!',
      target: identifier,
    };

    const url = new URL('/api/emails/magic-link', __URL__);
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
