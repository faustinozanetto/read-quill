import { ReferralsGetResponse } from '@modules/api/types/referrals-api.types';
import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';

// /api/referrals GET : Gets a referral code by name
export async function GET(request: NextRequest): Promise<NextResponse<ReferralsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        {
          error: {
            message: 'Code is required!',
          },
        },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        referralCode: {
          contains: code,
        },
      },
      select: { referralCode: true, name: true, avatar: { select: { path: true } } },
    });

    return NextResponse.json({ data: { referralCodes: users } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
