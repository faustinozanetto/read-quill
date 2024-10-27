import { ReferralsUseGetResponse } from '@modules/api/types/referrals-api.types';
import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';

// /api/referrals/use GET : Gets if a user used a referral code or not.
export async function GET(request: NextRequest): Promise<NextResponse<ReferralsUseGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        {
          error: {
            message: 'User ID is required!',
          },
        },
        { status: 400 }
      );
    }

    const referrals = await prisma.referral.findMany({
      where: { referredId: userId },
      select: {
        owner: { select: { referralCode: true } },
      },
    });
    if (referrals.length === 0) {
      return NextResponse.json({ data: { usedReferralCode: null } });
    }

    const referralCode = referrals[0].owner.referralCode;

    return NextResponse.json({ data: { usedReferralCode: referralCode } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
