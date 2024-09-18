import { EmailSendPostResponse } from '@modules/api/types/emails-api.types';

import { EMAIL_ACTIONS_VALIDATIONS_API } from '@modules/emails/lib/emails.validations';
import { sendEmail } from '@modules/emails/lib/resend.lib';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { MagicLinkEmail } from '@read-quill/emails/emails/magic-link-email';

// /api/emails/welcome POST : Sends a welcome email.
export async function POST(request: NextRequest): Promise<NextResponse<EmailSendPostResponse>> {
  try {
    const json = await request.json();
    const { target, subject, url } = EMAIL_ACTIONS_VALIDATIONS_API.SEND_MAGIC_LINK.parse(json);

    const resend = new Resend(process.env.RESEND_API_KEY!);

    const result = await sendEmail(resend, {
      email: target,
      subject,
      react: MagicLinkEmail({ url }),
    });
    if (result.error) {
      return NextResponse.json({ error: { message: 'Could not send email!' } }, { status: 500 });
    }

    return NextResponse.json({ data: { sent: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
